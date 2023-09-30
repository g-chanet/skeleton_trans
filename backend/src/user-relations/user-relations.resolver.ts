import {
  Resolver,
  Mutation,
  Args,
  Query,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { UserRelationsService } from './user-relations.service'
import { UserRelation } from './entities/user-relation.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User, UserPublicGameInfos } from 'src/users/entities/user.entity'
import * as DTO from './dto/user-relation.input'
import { EUserRelationType } from '@prisma/client'

const pubSub = new PubSub()
@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) { }
  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async createRequestFriend(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateRequestFriendInput,
  ) {
    const result = await this.userRelationsService.createRequestFriend(
      user.id,
      args.userTargetId,
    )
    const targetResult = await this.userRelationsService.findOne(
      args.userTargetId,
      user.id,
    )
    pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: { ...result, userId: user.id },
    })
    pubSub.publish(`userRelationsChanged:${result.userTargetId}`, {
      userRelationsChanged: { ...targetResult, userId: result.userTargetId },
    })
    return result
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async acceptFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    const result = await this.userRelationsService.acceptPendingRelation(
      user.id,
      args.userTargetid,
    )
    const targetResult = await this.userRelationsService.findOne(
      args.userTargetid,
      user.id,
    )
    pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: { ...result, userId: user.id },
    })
    pubSub.publish(`userRelationsChanged:${result.userTargetId}`, {
      userRelationsChanged: { ...targetResult, userId: result.userTargetId },
    })
    return result
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async refuseFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    const result = await this.userRelationsService.refusePendingRelation(
      user.id,
      args.userTargetid,
    )
    const targetResult = await this.userRelationsService.findOne(
      args.userTargetid,
      user.id,
    )
    pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: { ...result, userId: user.id },
    })
    pubSub.publish(`userRelationsChanged:${result.userTargetId}`, {
      userRelationsChanged: { ...targetResult, userId: result.userTargetId },
    })
    return result
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async blockRelation(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.blockRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async unblockRelation(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.unblockRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async removeFriend(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    const targetResult = await this.userRelationsService.findOne(
      args.userTargetid,
      user.id,
    )
    const result = await this.userRelationsService.removeFriend(
      user.id,
      args.userTargetid,
    )
    targetResult.type = EUserRelationType.Terminated
    result.type = EUserRelationType.Terminated
    pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: { ...result, userId: user.id },
    })
    pubSub.publish(`userRelationsChanged:${result.userTargetId}`, {
      userRelationsChanged: { ...targetResult, userId: result.userTargetId },
    })
    return result
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [UserRelation])
  @UseGuards(GqlAuthGuard)
  async findAllRelationsForMyUser(@CtxUser() user: User) {
    return await this.userRelationsService.findAllForUser(user.id)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => UserRelation, {
    filter: (payload, variables) => {
      return payload.userRelationsChanged.userId === variables.userId
    },
  })
  userRelationsChanged(@Args(`userId`) userId: string) {
    return pubSub.asyncIterator(`userRelationsChanged:${userId}`)
  }

  @ResolveField(`friendInfos`, () => UserPublicGameInfos)
  async userGameInfos(
    @Parent() userRelation: UserRelation,
  ): Promise<UserPublicGameInfos> {
    const { userTarget } = await this.userRelationsService.findOne(
      userRelation.userOwnerId,
      userRelation.userTargetId,
    )

    const gameStats = userTarget.gameStats
    let totalWins = 0

    gameStats.forEach((stats) => {
      if (stats.isWinner) {
        totalWins++
      }
    })

    const ratio = gameStats.length > 0 ? totalWins / gameStats.length : 0

    return {
      username: userTarget.username,
      avatarUrl: userTarget.avatarUrl,
      ratio: Number(ratio.toFixed(2)),
    }
  }
}
