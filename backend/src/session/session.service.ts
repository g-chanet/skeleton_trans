import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  create(userId: string) {
    return this.prisma.session.create({
      data: {
        userId,
      },
    });
  }

  delete(id: string) {
    return this.prisma.session.delete({
      where: {
        id,
      },
    });
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findOne(id: string) {
    return this.prisma.session.findUnique({
      where: {
        id,
      },
    });
  }
}
