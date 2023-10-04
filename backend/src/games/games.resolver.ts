import { BadRequestException, UseGuards } from '@nestjs/common'
import { GameData } from './entities/game-data.entity'
import { Resolver, Mutation, Args, Query, Subscription } from '@nestjs/graphql'
import { GamesService } from './games.service'
import { UsersService } from '../users/users.service'
import { GameMembersService } from 'src/game-members/game-members.service'
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
    private readonly gameMemberService: GameMembersService,
    private readonly userService: UsersService,
    private readonly pubSub: PubSub,
  ) { }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameData)
  @UseGuards(GqlAuthGuard)
  createGame(
    @CtxUser() user: User,
    @Args(`message`, { nullable: true }) message?: string,
    @Args(`userTargetId`, { nullable: true }) userTargetId?: string,
  ) {
    console.log(message)
    console.log(userTargetId)
    return this.gamesService.create({
      message: message,
      targetUserId: userTargetId,
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

  @Mutation(() => Game)
  async deleteGame(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.DeleteGameInput,
  ) {
    return await this.gamesService.delete(args.id)
  }

  @Mutation(() => Game)
  @UseGuards(GqlAuthGuard)
  joinGame(@CtxUser() user: User, @Args(`args`) args: DTO.JoinGameInput) {
    return this.gamesService.playerJoin(args.id, user)
  }

  @Mutation(() => [Game])
  DEBUGkilleallgames() {
    return this.gamesService.killAll()
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async leaveGame(@CtxUser() user: User) {
    console.log(`leaveGame called`)
    const userGame = await this.gamesService.findGameByUserId(user.id)
    if (!userGame) {
      return true
    }
    const otherPlayer = await this.gameMemberService.findOtherPlayerInGame(
      user.id,
    )
    if (userGame) {
      await this.gamesService.delete(userGame.id)
      userGame.isDeleted = true
    }
    if (otherPlayer) {
      console.log(`publishing for other player`)
      // publishing info to opponent that game have been terminated
      await this.pubSub.publish(`UserGameUpdated:${otherPlayer.userId}`, {
        UserGameUpdated: {
          ...userGame,
          userId: otherPlayer.userId,
        },
      })
    }
    return true
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

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async refusePrivateGameInvitation(
    @CtxUser() user: User,
    @Args(`gameId`) gameId: string,
  ) {
    const game = await this.gamesService.findOne(gameId)
    if (!game) {
      throw new BadRequestException(`this game does not exists`)
    }
    if (game && game.targetUserId != user.id) {
      throw new BadRequestException(`you're not invited to this game`)
    } else {
      console.log(`the game have been refused (old)`)
      this.gamesService.endGameOnFailure(gameId)
    }
    return true
  }
  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [GameStat])
  @UseGuards(GqlAuthGuard)
  async findAllGameStatsSoftLimit() {
    const gameStats = await this.gamesService.findManyGameStatsSoftLimit(20)
    return gameStats
  }

  @Query(() => [Game])
  @UseGuards(GqlAuthGuard)
  async findAllGames() {
    return await this.gamesService.findAll()
  }

  @Query(() => Game)
  @UseGuards(GqlAuthGuard)
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

  @Subscription(() => Game, {
    filter: (payload, variables) => {
      return payload.UserGameUpdated.userId === variables.userId
    },
  })
  UserGameUpdated(@Args(`userId`) userId: string) {
    return this.pubSub.asyncIterator(`UserGameUpdated:${userId}`)
  }

  @Subscription(() => GameStat, {
    filter: (payload, variables) => payload.userId === variables.userId,
  })
  allGamesStatsUpdatedForUser(@Args(`userId`) userId: string) {
    console.log(`userGamesStats:${userId}`)
    const res = this.pubSub.asyncIterator(`userGamesStats:${userId}`)
    return res
  }
}
