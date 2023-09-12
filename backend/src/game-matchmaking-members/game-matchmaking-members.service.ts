import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { GamesService } from 'src/games/games.service'

@Injectable()
export class GameMatchmakingMembersService {
  constructor(
    private prisma: PrismaService,
    private readonly gameService: GamesService,
  ) { }
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameMatchmakingMemberUncheckedCreateInput) {
    console.log(`entered create MMmeber function`)
    const ret = await this.prisma.gameMatchmakingMember.create({ data })
    const games = await this.prisma.game.findMany({
      include: {
        gameMembers: true,
      },
    })
    const availableGame = games.find((game) => game.gameMembers.length === 1)
    console.log(`available games: `, availableGame)
    if (availableGame) {
      console.log(`game: `, availableGame)
      await this.prisma.gameMatchmakingMember.delete({
        where: { userId: ret.userId },
      })
      const updatedGame = this.gameService.playerJoin(
        availableGame.id,
        await this.prisma.user.findFirst({ where: { id: data.userId } }),
      )
      console.log(updatedGame)
    }
    return ret
  }

  async delete(userId: string) {
    try {
      this.prisma.gameMatchmakingMember.findFirst({ where: { userId: userId } })
      return await this.prisma.gameMatchmakingMember.delete({
        where: { userId },
      })
    } catch (error) {
      return undefined
    }
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.gameMatchmakingMember.findMany({})
  }
}
