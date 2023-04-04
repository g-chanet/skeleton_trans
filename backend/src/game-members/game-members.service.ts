import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameMembersService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameMemberUncheckedCreateInput) {
    return await this.prisma.gameMember.create({ data });
  }

  async update(
    gameId: string,
    userId: string,
    data: Prisma.GameMemberUncheckedUpdateInput,
  ) {
    return await this.prisma.gameMember.update({
      where: {
        gameId_userId: {
          gameId,
          userId,
        },
      },
      data,
    });
  }

  async delete(gameId: string, userId: string) {
    return await this.prisma.gameMember.delete({
      where: { gameId_userId: { gameId, userId } },
    });
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAllForGame(gameId: string) {
    return await this.prisma.gameMember.findMany({ where: { gameId } });
  }

  async findOne(
    gameId_userId: Prisma.GameMemberGameIdUserIdCompoundUniqueInput,
  ) {
    return await this.prisma.gameMember.findUnique({
      where: { gameId_userId },
    });
  }
}
