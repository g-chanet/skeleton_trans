import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMember } from './entities/game-matchmaking-member.entity'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => GameMatchmakingMember)
export class GameMatchmakingMembersResolver {
  constructor(
    private readonly gameMatchmakingMembersService: GameMatchmakingMembersService,
    private readonly pubSub: PubSub,
  ) { }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameMatchmakingMember)
  @UseGuards(GqlAuthGuard)
  async joinGameMatchmakingMember(@CtxUser() user: User) {
    const newMember = await this.gameMatchmakingMembersService.create({
      userId: user.id,
    })
    this.pubSub.publish(`matchmakingMembersChanged`, {
      matchmakingMembersChanged:
        await this.gameMatchmakingMembersService.findAll(),
    })
    return newMember
  }

  @Mutation(() => GameMatchmakingMember)
  @UseGuards(GqlAuthGuard)
  async leaveGameMatchmakingMember(@CtxUser() user: User) {
    const deletedMember = await this.gameMatchmakingMembersService.delete(
      user.id,
    )
    this.pubSub.publish(`matchmakingMembersChanged`, {
      matchmakingMembersChanged:
        await this.gameMatchmakingMembersService.findAll(),
    })
    return deletedMember
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [GameMatchmakingMember])
  async findAllGameMatchmakingMemberl() {
    return await this.gameMatchmakingMembersService.findAll()
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => [GameMatchmakingMember])
  matchmakingMembersChanged() {
    return this.pubSub.asyncIterator(`matchmakingMembersChanged`)
  }
}
