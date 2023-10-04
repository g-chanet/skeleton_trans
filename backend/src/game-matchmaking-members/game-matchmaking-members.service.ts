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

    if (alreadyPresent) {
      console.log(`already a matchmaking member: `, alreadyPresent)
      await this.delete(alreadyPresent.userId)
    }
    const newMatchmakingMember = await this.prisma.gameMatchmakingMember.create(
      {
        data,
      },
    )
    let opponentSearchCriteria
    if (data.targetUserId) {
      opponentSearchCriteria = { userId: data.targetUserId, isDeleted: false }
    } else {
      opponentSearchCriteria = {
        targetUserId: null,
        isDeleted: false,
        userId: { not: data.userId },
      }
    }
    const opponent = await this.prisma.gameMatchmakingMember.findFirst({
      where: opponentSearchCriteria,
    })

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
      console.log(`game has just been created`)
      console.log(`game: `, newGame)
      await this.pubSub.publish(`UserGameUpdated:${data.userId}`, {
        UserGameUpdated: {
          ...newGame,
          userId: data.userId,
        },
      })
      await this.pubSub.publish(`UserGameUpdated:${opponent.userId}`, {
        UserGameUpdated: {
          ...newGame,
          userId: opponent.userId,
        },
      })
      console.log(`juste before game publishing`)
      await this.pubSub.publish(`allGamesUpdated`, {
        allGamesUpdated: newGame,
      })
      console.log(`juste after game publishing`)
      const ret = await this.delete(data.userId)
      await this.delete(opponent.userId)
      return ret
    } else {
      await this.pubSub.publish(`matchmakingMembersChanged`, {
        matchmakingMembersChanged: newMatchmakingMember,
      })
      return newMatchmakingMember
    }
  }

  async alternativeCreate(
    data: Prisma.GameMatchmakingMemberUncheckedCreateInput,
  ) {
    console.log(`entered create MMmeber function`)
    console.log(data)
    const alreadyPresent = await this.prisma.gameMatchmakingMember.findFirst({
      where: { userId: data.userId },
    })
    console.log(`alredy a matchmaking member: `, alreadyPresent)
    if (alreadyPresent) {
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
          include: { user: true },
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
        console.log(`two game Members`)
        opponent.isDeleted = true
        opponent.isLaunched = true
        ret.isDeleted = true
        ret.isLaunched = true
        await this.prisma.gameMatchmakingMember.delete({
          //petage ici
          where: { userId: opponent.userId },
        })
        await this.prisma.gameMatchmakingMember.delete({
          where: { userId: ret.userId },
        })
        console.log(`just before pubSub Publication`)
        console.log(opponent)
        console.log(ret)
        await this.pubSub.publish(`matchmakingMembersChanged`, {
          matchmakingMembersChanged: opponent,
        })
        await this.pubSub.publish(`UserGameUpdated:${ret.userId}`, {
          UserGameUpdated: {
            ...newGame,
            userId: ret.userId,
          },
        })
        await this.pubSub.publish(`UserGameUpdated:${opponent.userId}`, {
          UserGameUpdated: {
            ...newGame,
            userId: opponent.userId,
          },
        })
        console.log(`juste before game publishing`)
        await this.pubSub.publish(`allGamesUpdated`, {
          allGamesUpdated: newGame,
        })
      }
    }
    await this.pubSub.publish(`matchmakingMembersChanged`, {
      matchmakingMembersChanged: ret,
    })
    return ret
  }

  async delete(userId: string) {
    console.log(`will try to delete record: `, userId)
    const ret = await this.prisma.gameMatchmakingMember.findUnique({
      where: { userId: userId },
    })
    console.log(`entered MatchMkaing service delete fucntion`)
    console.log(`ret: `, ret.userId)
    if (ret) {
      ret.isDeleted = true
      await this.prisma.gameMatchmakingMember.delete({
        where: { userId: userId },
      })
      await this.pubSub.publish(`matchmakingMembersChanged`, {
        matchmakingMembersChanged: ret,
      })
      console.log(`record have been found and is deleted`)
      return ret
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
