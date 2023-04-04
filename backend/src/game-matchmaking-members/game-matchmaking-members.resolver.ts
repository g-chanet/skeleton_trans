import { Mutation, Query, Resolver } from '@nestjs/graphql'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMember } from './entities/game-matchmaking-member.entity'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from '@prisma/client'

@Resolver(() => GameMatchmakingMember)
export class GameMatchmakingMembersResolver {
  constructor(
    private readonly gameMatchmakingMembersService: GameMatchmakingMembersService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameMatchmakingMember)
  @UseGuards(GqlAuthGuard)
  async joinGameMatchmakingMember(@CtxUser() user: User) {
    return await this.gameMatchmakingMembersService.create({
      userId: user.id,
    })
  }

  @Mutation(() => GameMatchmakingMember)
  @UseGuards(GqlAuthGuard)
  async leaveGameMatchmakingMember(@CtxUser() user: User) {
    return await this.gameMatchmakingMembersService.remove(user.id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [GameMatchmakingMember])
  async findAllChannelMembersForChannel() {
    return await this.gameMatchmakingMembersService.findAll()
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
