import { ChannelMembersService } from './../channel-members/channel-members.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EChannelMemberType, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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
    });
  }

  update(id: string) {
    return `This action updates a #${id}`;
  }

  remove(id: string) {
    return `This action removes a #${id}`;
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findAll() {
    return `This action returns all`;
  }

  findOne(id: string) {
    return `This action returns a #${id}`;
  }
}
