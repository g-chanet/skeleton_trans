import { Injectable, BadRequestException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { GamesService } from 'src/games/games.service'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class GameMatchmakingMembersService {
  constructor(
    private prisma: PrismaService,
    private readonly gameService: GamesService,
    private readonly pubSub: PubSub,
  ) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameMatchmakingMemberUncheckedCreateInput) {
    console.log(`entered create MMmeber function`)
    const alreadyPresent = await this.prisma.gameMatchmakingMember.findFirst({
      where: { userId: data.userId },
    })
    console.log(alreadyPresent)
    if (alreadyPresent) {
      throw new BadRequestException(`Vous êtes déjà en recherche de partie !`)
    }
    const opponent = await this.prisma.gameMatchmakingMember.findFirst()
    const ret = await this.prisma.gameMatchmakingMember.create({ data })
    if (opponent) {
      const newGame = await this.prisma.game.create({
        data: {
          gameMembers: {
            create: [{ userId: data.userId }, { userId: opponent.userId }],
          },
        },
        include: {
          gameMembers: true,
        },
      })
      if (newGame.gameMembers.length == 2) {
        opponent.isDeleted = true
        ret.isDeleted = true
        await this.prisma.gameMatchmakingMember.deleteMany({
          where: { userId: opponent.userId },
        })
        await this.prisma.gameMatchmakingMember.deleteMany({
          where: { userId: ret.userId },
        })
        this.pubSub.publish(`matchmakingMembersChanged`, {
          matchmakingMembersChanged: opponent,
        })
        this.pubSub.publish(`allGamesUpdated`, {
          allGamesUpdated: newGame,
        })
      }
    }
    this.pubSub.publish(`matchmakingMembersChanged`, {
      matchmakingMembersChanged: ret,
    })
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

  async findOne(userId: string) {
    return await this.prisma.gameMatchmakingMember.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            username: true,
            avatarUrl: true,
            gameStats: true,
          },
        },
      },
    })
  }
}
