import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { UserRelationsService } from './user-relations.service'
import { UserRelation } from './entities/user-relation.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import * as DTO from './dto/user-relation.input'

@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) { }
  pubSub = new PubSub()
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
    this.pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: result,
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
    this.pubSub.publish(`userRelationsChanged:${user.id}`, {
      userRelationsChanged: result,
    })
    return result
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async refuseFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.refusePendingRelation(
      user.id,
      args.userTargetid,
    )
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
  async removeFriend(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.removeFriend(
      user.id,
      args.userTargetid,
    )
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //protect DEBUG

  @Query(() => [UserRelation])
  async findAllRelations() {
    console.log(await this.userRelationsService.findAll())
    return await this.userRelationsService.findAll()
  }

  @Query(() => [UserRelation])
  @UseGuards(GqlAuthGuard)
  async findAllRelationsForMyUser(@CtxUser() user: User) {
    return await this.userRelationsService.findAllForUser(user.id)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => [UserRelation])
  @UseGuards(GqlAuthGuard)
  userRelationsChanged(@CtxUser() user: User) {
    console.log(`changed`)
    return this.pubSub.asyncIterator(`userRelationsChanged:${user.id}`)
  }
}
