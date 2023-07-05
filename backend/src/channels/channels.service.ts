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
    if (data.password !== null)
      data.password = await AuthHelper.hash(data.password)
    return await this.prisma.channel.create({ data })
  }

  async update(id: string, data: Prisma.ChannelUpdateInput) {
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

  async findAllPublic(userId: string) {
    return await this.prisma.channel.findMany({
      where: {
        channelType: EChannelType.Public,
        channelMembers: { none: { userId: userId } },
      },
    })
  }

  async findAllProtected(userId: string) {
    return await this.prisma.channel.findMany({
      where: {
        channelType: EChannelType.Protected,
        channelMembers: { none: { userId: userId } },
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

  async verifyChannelPassword(channelId: string, password: string) {
    const channel = await this.prisma.channel.findFirst({
      where: { id: channelId },
    })
    if (channel.channelType === EChannelType.Public) return true
    return await compare(password, channel.password)
  }
}
