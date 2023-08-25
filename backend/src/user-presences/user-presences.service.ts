import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { PubSub } from 'graphql-subscriptions'

@Injectable()
export class UserPresencesService {
  constructor(private prisma: PrismaService, private readonly pubSub: PubSub) { }
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.UserPresenceUncheckedCreateInput) {
    return await this.prisma.userPresence.create({ data })
  }

  async update(id: string, data: Prisma.UserPresenceUncheckedUpdateInput) {
    return await this.prisma.userPresence.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prisma.userPresence.delete({ where: { id } })
  }

  async updateOrCreateUserPresence(userId: string) {
    let userPresence = await this.prisma.userPresence.findFirst({
      where: { userId: userId },
    })

    if (userPresence) {
      const twentySecondsAgo = new Date(Date.now() - 20 * 1000)
      const needRefresh = new Date(userPresence.connectedAt) <= twentySecondsAgo
      console.log(
        `daaaa: `,
        needRefresh,
        ` `,
        userPresence.connectedAt,
        ` `,
        twentySecondsAgo,
      )
      if (needRefresh) {
        userPresence = await this.prisma.userPresence.update({
          where: { id: userPresence.id },
          data: { connectedAt: new Date() },
        })
      } else {
        return
      }
    } else {
      userPresence = await this.prisma.userPresence.create({
        data: {
          userId: userId,
          connectedAt: new Date(),
        },
      })
    }
    this.pubSub.publish(`userPresenceUpdated:${userPresence.userId}`, {
      usersPresenceUpdated: userPresence,
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.userPresence.findMany({})
  }

  async findOne(id: string) {
    return await this.prisma.userPresence.findFirst({ where: { id } })
  }

  async getUserPresencesByUserIds(userIds: string[]) {
    return await this.prisma.userPresence.findMany({
      where: { userId: { in: userIds } },
    })
  }
}
