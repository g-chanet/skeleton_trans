import {
  Mutation,
  Query,
  Resolver,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMember } from './entities/game-matchmaking-member.entity'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { UseGuards, BadRequestException } from '@nestjs/common'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { UserPublicGameInfos } from 'src/users/entities/user.entity'

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
    return newMember
  }

  @Mutation(() => GameMatchmakingMember)
  @UseGuards(GqlAuthGuard)
  async leaveGameMatchmakingMember(@CtxUser() user: User) {
    const todelete = await this.gameMatchmakingMembersService.findOne(user.id)
    if (todelete) {
      todelete.isDeleted = true
      await this.gameMatchmakingMembersService.delete(user.id)
      this.pubSub.publish(`matchmakingMembersChanged`, {
        matchmakingMembersChanged: todelete,
      })
    } else {
      throw new BadRequestException(`You're not looking for a game`)
    }
    return todelete
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

  @Subscription(() => GameMatchmakingMember)
  matchmakingMembersChanged() {
    return this.pubSub.asyncIterator(`matchmakingMembersChanged`)
  }

  @ResolveField(`userGameInfos`, () => UserPublicGameInfos)
  async userGameInfos(
    @Parent() GameMatchmakingMember: GameMatchmakingMember,
  ): Promise<UserPublicGameInfos> {
    if (!GameMatchmakingMember.isDeleted) {
      const { user } = await this.gameMatchmakingMembersService.findOne(
        GameMatchmakingMember.userId,
      )
      if (user) {
        const gameStats = user.gameStats
        let totalWins = 0

        gameStats.forEach((stats) => {
          if (stats.isWinner) {
            totalWins++
          }
        })

        const ratio = gameStats.length > 0 ? totalWins / gameStats.length : 0

        return {
          username: user.username,
          avatarUrl: user.avatarUrl,
          ratio: Number(ratio.toFixed(2)),
        }
      }
    }
    return {
      username: `deleted`,
      avatarUrl: `https://https://img-4.linternaute.com/q_N1jQGmO8sUI6v2LOGFcRrXqpE=/1500x/smart/08e82cbcdf5a42c8b79808bc6b15792a/ccmcms-linternaute/48672760.jpg`,
      ratio: 0,
    }
  }
}
