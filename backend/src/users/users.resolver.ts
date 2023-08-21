import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import {
  UserPublic,
  User,
  UserTwoFaSettings,
  DailyGameRatios,
  GeneralUserGameStats,
} from './entities/user.entity'
import * as DTO from './dto/user.input'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { GameStat } from 'src/games/entities/gameStat.entity'
import { AuthHelper } from 'src/auth/auth.helper'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateMyUser(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateMyUserInput,
  ) {
    let usr
    if (args.avatarUrl || args.doubleAuth || args.username) {
      if (args.username) {
        if (
          user.username != args.username &&
          (await this.usersService.findOneByUsername(args.username))
        )
          throw new UnauthorizedException(`This username is already in use`)
      }
      usr = await this.usersService.update(user.id, args)
    } else {
      usr = user
    }
    return usr
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteMyUser(@CtxUser() user: User) {
    return this.usersService.delete(user.id)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async updateMyPassword(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateMyPasswordInput,
  ) {
    await this.usersService.update(user.id, {
      password: await AuthHelper.hash(args.newPassword),
    })
    return true
  }
  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  findMyUser(@CtxUser() user: User) {
    return user
  }

  @Query(() => UserPublic)
  @UseGuards(GqlAuthGuard)
  async findUser(@Args(`args`) args: DTO.FindUserInput) {
    return await this.usersService.findOne(args.id)
  }

  @Query(() => [UserPublic])
  @UseGuards(GqlAuthGuard)
  async findLeaderboardUserList() {
    return await this.usersService.findAllUsersSorted()
  }

  @Query(() => [UserPublic])
  @UseGuards(GqlAuthGuard)
  async findPublicUsersList() {
    return await this.usersService.findAllUsersSorted()
  }

  @Query(() => UserTwoFaSettings)
  @UseGuards(GqlAuthGuard)
  findUserTwoFaSettings(@CtxUser() user: User) {
    if (!user.isOauth) {
      return user
    } else throw new UnauthorizedException(`user must not be an oauth user`)
  }

  @Query(() => [DailyGameRatios])
  @UseGuards(GqlAuthGuard)
  async findDailyGameRatios(@CtxUser() user: User) {
    const gameStats = (await this.usersService.findOne(user.id)).gameStats
    const groupedStats: { [key: string]: any[] } = {}

    gameStats.forEach((stat) => {
      const createdAtDate = new Date(stat.createdAt)
      const key = `${createdAtDate.getFullYear()}-${createdAtDate.getMonth() + 1
        }-${createdAtDate.getDate()}`
      if (!groupedStats[key]) {
        groupedStats[key] = []
      }
      groupedStats[key].push(stat)
    })

    const results: DailyGameRatios[] = []

    for (const [date, stats] of Object.entries(groupedStats)) {
      const wins = stats.filter((game) => game.isWinner).length
      const losses = stats.length - wins
      const ratio = wins / (wins + losses)
      results.push({
        date: new Date(date),
        wins: wins,
        losses: losses,
        ratio: ratio,
      })
    }
    results.sort((a, b) => b.date.getTime() - a.date.getTime())
    return results
  }

  @Query(() => GeneralUserGameStats)
  @UseGuards(GqlAuthGuard)
  async findGeneralGameStatsForUser(@CtxUser() user: User) {
    const gameStats = (await this.usersService.findOne(user.id)).gameStats
    let totalpoints = 0
    let totalwins = 0

    gameStats.forEach((stats) => {
      totalpoints += parseInt(stats.userScore)
      if (stats.isWinner) {
        totalwins++
      }
    })
    const result: GeneralUserGameStats = {
      gamesCount: gameStats.length,
      allTimeRatio: totalwins / gameStats.length,
      MeanPoints: totalpoints / gameStats.length,
    }
    return result
  }

  @Query(() => [GameStat])
  @UseGuards(GqlAuthGuard)
  async findAllGameStatsForUser(@CtxUser() user: User) {
    const gameStats = (await this.usersService.findOne(user.id)).gameStats
    return gameStats
  }
}

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
