import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChannelMessagesService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create(userId: string, data: Prisma.ChannelMessageUncheckedCreateInput) {
    data.userId = userId;
    return this.prisma.channelMessage.create({ data });
  }

  update(id: string, data: Prisma.ChannelMessageUpdateInput) {
    return this.prisma.channelMessage.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.channelMessage.delete({ where: { id } });
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findAll() {
    return this.prisma.channelMessage.findMany({});
  }

  findOne(id: string) {
    return this.prisma.channelMessage.findFirst({ where: { id } });
  }

  findAllForChannel(channelId: string) {
    return this.prisma.channelMessage.findMany({ where: { channelId } });
  }
}
