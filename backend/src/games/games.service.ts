import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { GameData, PlayerData } from './entities/game-data.entity'
import { Game } from './entities/game.entity'
import { Prisma } from '@prisma/client'

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) { }

  //**************************************************//
  //  GAME DATA
  //**************************************************//

  private gamesData = new Map<string, GameData>()

  playerJoin(gameId: string, user: User) {
    return this.findGameData(gameId).join(user)
  }

  playerLeave(gameId: string, user: User) {
    return this.findGameData(gameId).leave(user)
  }

  playerUpdate(gameId: string, user: User, data: Partial<PlayerData>) {
    return this.findGameData(gameId).updatePlayer(user, data)
  }

  findGameData(gameId: string) {
    if (!this.gamesData.has(gameId)) {
      throw new BadRequestException(`Cannot update gameData with ${gameId}`)
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
    return this.createGameData(game)
  }

  async update(id: string, data: Prisma.GameUpdateInput) {
    const game = await this.prisma.game.update({ where: { id }, data })
    return this.updateGameData(game)
  }

  async delete(id: string) {
    const game = await this.prisma.game.delete({ where: { id } })
    this.deleteGameData(game)
    return game
  }

  async createGameStat(data: Prisma.GameStatUncheckedCreateInput) {
    return await this.prisma.gameStat.create({ data })
  }

  async deleteGameStat(userId: string, id: string) {
    return await this.prisma.gameStat.delete({
      where: { id_userId: { id, userId } },
    })
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
  //**************************************************//
  //  QUERY
  //**************************************************//
}
