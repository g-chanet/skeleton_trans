import { UseGuards } from '@nestjs/common'
import { GameData } from './entities/game-data.entity'
import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql'
import { GamesService } from './games.service'
import { UsersService } from '../users/users.service'
import { Game } from './entities/game.entity'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { User } from 'src/users/entities/user.entity'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import * as DTO from './dto/game.input'
import * as GAMESTATDTO from './dto/gameStat.input'
import { randomInt } from 'crypto'
import { GameStat } from './entities/gameStat.entity'
import { PubSub } from 'graphql-subscriptions'

@Resolver(() => Game)
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly userService: UsersService,
    private readonly pubSub: PubSub,
  ) { }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameData)
  @UseGuards(GqlAuthGuard)
  createGame(@CtxUser() user: User, @Args(`args`) args: DTO.CreateGameInput) {
    return this.gamesService.create({
      message: args.message,
      gameMembers: {
        create: {
          userId: user.id,
        },
      },
    })
  }

  @Mutation(() => GameData)
  updateGame(@CtxUser() user: User, @Args(`args`) args: DTO.UpdateGameInput) {
    return this.gamesService.update(args.id, args)
  }

  @Mutation(() => GameData)
  @UseGuards(GqlAuthGuard)
  joinGame(@CtxUser() user: User, @Args(`args`) args: DTO.JoinGameInput) {
    return this.gamesService.playerJoin(args.id, user)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async leaveGame(@CtxUser() user: User) {
    const userGame = await this.gamesService.findGameByUserId(user.id)
    if (
      userGame &&
      (await this.gamesService.playerLeave(userGame.id, user)).userId == user.id
    ) {
      return true
    } else {
      return false
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async injectFalseGameStatData(@CtxUser() user: User) {
    const randomEmail = `${randomInt(999999999)}@gmail.com`
    const randomUsername = `Fakeuser${randomInt(99999999)}`

    const opponentUsr = await this.userService.create({
      email: randomEmail,
      username: randomUsername,
      avatarUrl: `https://icons.iconarchive.com/icons/iconarchive/incognito-animals/512/Bear-Avatar-icon.png`,
    })

    const currentDate = new Date()
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() - 30)

    for (
      let day = startDate;
      day <= currentDate;
      day.setDate(day.getDate() + 1)
    ) {
      const numberOfGamesToday = randomInt(3, 6)

      for (let gameIndex = 0; gameIndex < numberOfGamesToday; gameIndex++) {
        const gameStat = await this.gamesService.createGameStat({
          userScore: randomInt(11).toString(),
          opponentId: opponentUsr.id,
          opponentScore: randomInt(11).toString(),
          isWinner: true,
          userId: user.id,
          createdAt: new Date(day),
          isFakeData: true,
        })
        if (gameStat.opponentScore > gameStat.userScore) {
          await this.gamesService.updateGameStat(gameStat.id, gameStat.userId, {
            isWinner: false,
          })
        }
      }
    }
    return true
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeFalseGameStatData(@CtxUser() user: User) {
    const gameStats = (await this.userService.findOne(user.id)).gameStats
    gameStats.forEach(async (stat) => {
      if (stat.isFakeData) {
        await this.gamesService.deleteGameStat(user.id, stat.id)
      }
    })
    return true
  }

  @Mutation(() => GameStat)
  async createGameStat(
    @CtxUser() user: User,
    @Args(`args`) args: GAMESTATDTO.createGameStatInput,
  ) {
    const isWinner = () => {
      if (args.userScore >= args.opponentScore) return true
      return false
    }

    const gameStat = await this.gamesService.createGameStat({
      userScore: args.userScore,
      opponentId: args.opponentId,
      opponentScore: args.opponentScore,
      isWinner: isWinner(),
      userId: user.id,
      isFakeData: args.isFakeData,
    })
    return gameStat
  }
  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [GameStat])
  async findAllGameStatsSoftLimit() {
    const gameStats = await this.gamesService.findManyGameStatsSoftLimit(20)
    return gameStats
  }

  @Query(() => [Game])
  async findAllGames() {
    return await this.gamesService.findAll()
  }

  @Query(() => Game)
  async findGame(gameId) {
    return await this.gamesService.findOne(gameId)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => GameStat, { nullable: true })
  allGamesStatsUpdated() {
    const res = this.pubSub.asyncIterator(`allGamestatsUpdated`)
    return res
  }

  @Subscription(() => Game, { nullable: true })
  allGamesUpdated() {
    const res = this.pubSub.asyncIterator(`allGamesUpdated`)
    return res
  }

  @Subscription(() => GameStat, {
    filter: (payload, variables) => payload.userId === variables.userId,
  })
  allGamesStatsUpdatedForUser(@Args(`userId`) userId: string) {
    console.log(`userGamesStats:${userId}`)
    const res = this.pubSub.asyncIterator(`userGamesStats:${userId}`)
    const debugConsumeIterator = async () => {
      const result = await res.next()
      console.log(`Iterator next result:`, result)
      if (!result.done) {
        debugConsumeIterator()
      }
    }

    debugConsumeIterator()
    return res
  }
}
