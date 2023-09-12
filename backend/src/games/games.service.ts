import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { GameData, PlayerData } from './entities/game-data.entity'
import { Game } from './entities/game.entity'
import { Prisma } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService, private readonly pubSub: PubSub) { }

  //**************************************************//
  //  GAME DATA
  //**************************************************//

  private gamesData = new Map<string, GameData>()

  playerUpdate(gameId: string, user: User, data: Partial<PlayerData>) {
    return this.findGameData(gameId).updatePlayer(user, data)
  }

  findGameData(gameId: string) {
    if (!this.gamesData.has(gameId)) {
      throw new BadRequestException(`Cannot find gameData with ${gameId}`)
    }
    return this.gamesData.get(gameId)
  }

  updateGameData(game: Game) {
    return this.findGameData(game.id).update(game)
  }

  createGameData(game: Game) {
    if (this.gamesData.has(game.id)) {
      throw new BadRequestException(`Cannot create gameData with ${game.id}`)
    }
    const gameData = new GameData(game)
    this.gamesData.set(game.id, gameData)
    return gameData
  }

  deleteGameData(game: Game) {
    if (!this.gamesData.has(game.id)) {
      throw new BadRequestException(`Cannot delete gameData with ${game.id}`)
    }
    return this.gamesData.delete(game.id)
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameCreateInput) {
    const game = await this.prisma.game.create({ data })

    const matchmakingPlayer =
      await this.prisma.gameMatchmakingMember.findFirst()

    if (matchmakingPlayer) {
      await this.prisma.gameMember.create({
        data: {
          gameId: game.id,
          userId: matchmakingPlayer.userId,
        },
      })
    }

    const updatedGame = await this.prisma.game.findFirst({
      where: {
        id: game.id,
      },
      include: {
        gameMembers: true,
      },
    })
    if (
      updatedGame &&
      updatedGame.gameMembers &&
      updatedGame.gameMembers.length > 1 &&
      updatedGame.gameMembers[1].userId == matchmakingPlayer.userId
    ) {
      await this.prisma.gameMatchmakingMember.deleteMany({
        where: { userId: matchmakingPlayer.userId },
      })
      updatedGame.isDeleted = true
      this.pubSub.publish(`matchmakingMembersChanged`, {
        matchmakingMembersChanged:
          await this.prisma.gameMatchmakingMember.findMany({}),
      })
    }

    this.pubSub.publish(`allGamesUpdated`, {
      allGamesUpdated: updatedGame,
    })

    return updatedGame
  }

  async update(id: string, data: Prisma.GameUpdateInput) {
    const game = await this.prisma.game.update({ where: { id }, data })
    this.pubSub.publish(`allGamesUpdated`, {
      allGamesUpdated: game,
    })
    return this.updateGameData(game)
  }

  async delete(id: string) {
    const game = await this.prisma.game.delete({ where: { id } })
    this.pubSub.publish(`allGamesUpdated`, {
      allGamesUpdated: { ...game, isDeleted: true },
    })
    return game
  }

  async createGameStat(data: Prisma.GameStatUncheckedCreateInput) {
    const gameStat = await this.prisma.gameStat.create({ data })
    console.log(gameStat.userId)
    this.pubSub.publish(`allGamestatsUpdated`, {
      allGamesStatsUpdated: gameStat,
    })
    this.pubSub.publish(`userGamesStats:${gameStat.userId}`, {
      allGamesStatsUpdatedForUser: gameStat,
    })

    return gameStat
  }

  async deleteGameStat(userId: string, id: string) {
    console.log(userId)
    const gameStat = await this.prisma.gameStat.findUnique({
      where: { id_userId: { id, userId } },
    })
    await this.prisma.gameStat.delete({
      where: { id_userId: { id, userId } },
    })
    console.log(`userGamesStats:${userId}`)
    this.pubSub.publish(`allGamestatsUpdated`, {
      allGamesStatsUpdated: { ...gameStat, isDeleted: true },
    })
    this.pubSub.publish(`userGamesStats:${userId}`, {
      allGamesStatsUpdatedForUser: { ...gameStat, isDeleted: true },
    })
    return gameStat
  }

  async updateGameStat(
    id: string,
    userId: string,
    data: Prisma.GameStatUncheckedUpdateInput,
  ) {
    return await this.prisma.gameStat.update({
      where: { id_userId: { id, userId } },
      data,
    })
  }

  async playerJoin(gameId: string, user: User) {
    const existingMembers = await this.prisma.gameMember.count({
      where: { gameId: gameId },
    })
    if (existingMembers >= 2) {
      throw new BadRequestException(
        `This game already has the maximum number of players.`,
      )
    }
    const existingUser = await this.prisma.gameMember.findUnique({
      where: {
        gameId_userId: {
          gameId: gameId,
          userId: user.id,
        },
      },
    })
    if (existingUser) {
      throw new BadRequestException(`This user has already joined the game.`)
    }
    await this.prisma.gameMember.create({
      data: {
        gameId: gameId,
        userId: user.id,
      },
    })
    const game = await this.prisma.game.findFirst({
      where: { id: gameId },
      include: {
        gameMembers: true,
      },
    })
    this.pubSub.publish(`allGamesUpdated`, {
      allGamesUpdated: game,
    })
    return game
  }

  async playerLeave(gameId: string, user: User) {
    const memberToDelete = await this.prisma.gameMember.findUnique({
      where: {
        gameId_userId: {
          gameId: gameId,
          userId: user.id,
        },
      },
    })

    if (!memberToDelete) {
      throw new BadRequestException(`This user is not part of the game.`)
    }

    await this.prisma.gameMember.delete({
      where: {
        gameId_userId: {
          gameId: gameId,
          userId: user.id,
        },
      },
    })
    const remainingMembers = await this.prisma.gameMember.count({
      where: { gameId: gameId },
    })

    if (remainingMembers === 0) {
      await this.delete(gameId)
    } else {
      const updatedGame = this.prisma.game.findFirst({
        where: { id: gameId },
        include: {
          gameMembers: true,
        },
      })
      this.pubSub.publish(`allGamesUpdated`, {
        allGamesUpdated: updatedGame,
      })
    }

    return memberToDelete
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.game.findMany({
      include: {
        gameMembers: true,
      },
    })
  }

  async findManyGameStatsSoftLimit(limit: number) {
    return await this.prisma.gameStat.findMany({
      take: limit,
      orderBy: {
        createdAt: `desc`,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.game.findUnique({
      include: {
        gameMembers: true,
      },
      where: { id: id },
    })
  }

  async findGameByUserId(userId: string): Promise<Game | null> {
    const gameMember = await this.prisma.gameMember.findFirst({
      where: {
        userId: userId,
      },
      include: {
        game: true,
      },
    })

    return gameMember?.game || null
  }
}
