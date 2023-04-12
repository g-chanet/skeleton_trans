import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChannelMembersService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelMemberUncheckedCreateInput) {
    return await this.prisma.channelMember.create({ data });
  }

  async update(userId: string, data: Prisma.ChannelMemberUpdateInput) {
    return await this.prisma.channelMember.update({ where: { userId }, data });
  }

  async remove(userId: string, channelId: string) {
    return await this.prisma.channelMember.delete({ where: { userId } });
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.channelMember.findMany({});
  }

  async findOne(channelId: string, userId: string) {
    return await this.prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
    });
  }
}
