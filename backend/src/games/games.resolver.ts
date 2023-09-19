import { UseGuards } from '@nestjs/common'
import { GameData } from './entities/game-data.entity'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
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

@Resolver(() => Game)
@UseGuards(GqlAuthGuard)
export class GamesResolver {
  constructor(
    private readonly gamesService: GamesService,
    private readonly userService: UsersService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameData)
  createGame(@CtxUser() user: User, @Args(`args`) args: DTO.CreateGameInput) {
    return this.gamesService.create({
      ...args,
      gameMembers: {
        createMany: {
          data: args.userIds.map((e) => ({
            userId: e,
          })),
        },
      },
    })
  }

  @Mutation(() => GameData)
  updateGame(@CtxUser() user: User, @Args(`args`) args: DTO.UpdateGameInput) {
    return this.gamesService.update(args.id, args)
  }

  @Mutation(() => GameData)
  joinGame(@CtxUser() user: User, @Args(`args`) args: DTO.JoinGameInput) {
    return this.gamesService.playerJoin(args.id, user)
  }

  @Mutation(() => Boolean)
  leaveGame(@CtxUser() user: User, @Args(`args`) args: DTO.LeaveGameInput) {
    return this.gamesService.playerLeave(args.id, user)
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
        console.log(gameStat)
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
  @UseGuards(GqlAuthGuard)
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

    console.log(gameStat)
    return gameStat
  }
  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
