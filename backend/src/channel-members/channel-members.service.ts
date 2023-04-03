import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelMembersService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`;
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
