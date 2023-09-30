import { Injectable } from '@nestjs/common'
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
  ) { }
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameMatchmakingMemberUncheckedCreateInput) {
    console.log(`entered create MMmeber function`)
    console.log(data)
    const alreadyPresent = await this.prisma.gameMatchmakingMember.findFirst({
      where: { userId: data.userId },
    })
    console.log(`alredy a matchmaking member: `, alreadyPresent)
    if (alreadyPresent) {
      // if (
      //   data.targetUserId &&
      //   alreadyPresent.targetUserId &&
      //   data.targetUserId == alreadyPresent.targetUserId
      // ) {
      //   throw new BadRequestException(`Vous avez déjà défié ce joueur !`)
      // }
      // throw new BadRequestException(`Vous êtes déjà en recherche de partie !`)
      await this.delete(alreadyPresent.userId)
    }
    let opponent
    if (!data.targetUserId || data.targetUserId.length == 0) {
      console.log(`no target userID`)
      opponent = await this.prisma.gameMatchmakingMember.findFirst({
        where: { targetUserId: null },
      })
      console.log(`opponent : `, opponent)
    } else if (data.targetUserId && data.targetUserId.length) {
      console.log(`have target userID`)
      opponent = await this.prisma.gameMatchmakingMember.findFirst({
        where: {
          userId: data.targetUserId,
          targetUserId: null,
        },
      })
      console.log(`opponent : `, opponent)
      if (!opponent) {
        opponent = await this.prisma.gameMatchmakingMember.findFirst({
          where: {
            userId: data.targetUserId,
            targetUserId: data.userId,
          },
        })
      }
      console.log(`opponent : `, opponent)
    }
    const ret = await this.prisma.gameMatchmakingMember.create({ data })
    if (opponent) {
      console.log(` ----- before acreation ----`)
      console.log(`data: `, data)
      console.log(`opponent ; `, opponent)
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
        opponent.isLaunched = true
        ret.isDeleted = true
        ret.isLaunched = true
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
    const ret = await this.prisma.gameMatchmakingMember.findFirst({
      where: { userId: userId },
    })
    console.log(`ret: `, ret)
    if (ret) {
      ret.isDeleted = true
      await this.prisma.gameMatchmakingMember.delete({
        where: { userId: userId },
      })
      this.pubSub.publish(`matchmakingMembersChanged`, {
        matchmakingMembersChanged: ret,
      })
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
