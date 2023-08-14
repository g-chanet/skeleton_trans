import { Injectable } from '@nestjs/common'
import { EChannelType, Prisma } from '@prisma/client'
import { compare } from 'bcrypt'
import { AuthHelper } from 'src/auth/auth.helper'
import { PrismaService } from 'src/prisma/prisma.service'

const SALT_OR_ROUNDS = 10

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelCreateInput) {
    if (
      data.channelType === EChannelType.Protected &&
      data.password !== undefined
    )
      data.password = await AuthHelper.hash(data.password)
    return await this.prisma.channel.create({ data })
  }

  async update(id: string, password: string, data: Prisma.ChannelUpdateInput) {
    if (data.channelType === EChannelType.Protected && password !== undefined)
      data.password = await AuthHelper.hash(password)
    return await this.prisma.channel.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prisma.channel.delete({ where: { id } })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.channel.findMany({})
  }

  async findAllForUser(userId: string) {
    return await this.prisma.channel.findMany({
      where: {
        channelMembers: {
          some: {
            userId: {
              equals: userId,
            },
          },
        },
      },
    })
  }

  async findAllPublic(userId: string) {
    return await this.prisma.channel.findMany({
      where: {
        channelType: EChannelType.Public,
      },
    })
  }

  async findAllProtected(userId: string) {
    return await this.prisma.channel.findMany({
      where: {
        channelType: EChannelType.Protected,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.channel.findFirst({
      where: { id },
      include: {
        channelMembers: { include: { user: true } },
        channelMessages: true,
      },
    })
  }

  async checkChannelName(name: string) {
    const found = await this.prisma.channel.findFirst({ where: { name } })
    if (found === null) return false
    return true
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  //**************************************************//
  //  UTILS
  //**************************************************//
  async verifyChannelPassword(channelId: string, password: string) {
    const channel = await this.prisma.channel.findFirst({
      where: { id: channelId },
    })
    if (channel.channelType !== EChannelType.Protected) return true
    return await compare(password, channel.password)
  }
}
