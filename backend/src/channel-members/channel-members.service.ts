import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ChannelMembersService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelMemberUncheckedCreateInput) {
    return await this.prisma.channelMember.create({ data })
  }

  async update(
    userId: string,
    channelId: string,
    data: Prisma.ChannelMemberUncheckedUpdateInput,
  ) {
    return await this.prisma.channelMember.update({
      where: { channelId_userId: { userId, channelId } },
      data,
    })
  }

  async remove(userId: string, channelId: string) {
    return await this.prisma.channelMember.delete({
      where: { channelId_userId: { userId, channelId } },
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll(args: Prisma.ChannelMemberFindManyArgs) {
    return await this.prisma.channelMember.findMany(args)
  }

  async findOne(channelId: string, userId: string) {
    return await this.prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          userId,
          channelId,
        },
      },
    })
  }
}
