import { ChannelMembersService } from './../channel-members/channel-members.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { EChannelMemberType, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChannelMessagesService {
  constructor(
    private prisma: PrismaService,
    private channelMembersService: ChannelMembersService,
  ) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelMessageUncheckedCreateInput) {
    return await this.prisma.channelMessage.create({
      data,
    })
  }

  async update(
    id: string,
    userId: string,
    data: Prisma.ChannelMessageUncheckedUpdateInput,
  ) {
    return await this.prisma.channelMessage.update({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
      data,
    })
  }

  async delete(id: string, userId: string) {
    return await this.prisma.channelMessage.delete({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.channelMessage.findMany({})
  }

  async findOne(id: string, userId: string) {
    return await this.prisma.channelMessage.findUnique({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
    })
  }

  async findAllForChannel(channelId: string) {
    return await this.prisma.channelMessage.findMany({ where: { channelId } })
  }
}
