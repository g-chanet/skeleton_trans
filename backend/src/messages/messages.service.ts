import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.MessageCreateInput) {
    return this.prisma.message.create({ data });
  }

  findAll() {
    return this.prisma.message.findMany({});
  }

  findOne(uuid: string) {
    return this.prisma.message.findUnique({ where: { uuid } });
  }

  update(uuid: string, data: Prisma.MessageUpdateInput) {
    return this.prisma.message.update({ where: { uuid }, data });
  }

  remove(uuid: string) {
    return this.prisma.message.delete({ where: { uuid } });
  }
}
