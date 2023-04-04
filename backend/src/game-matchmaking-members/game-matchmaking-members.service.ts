import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GameMatchmakingMembersService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameMatchmakingMemberUncheckedCreateInput) {
    return await this.prisma.gameMatchmakingMember.create({ data })
  }

  async remove(userId: string) {
    return await this.prisma.gameMatchmakingMember.delete({ where: { userId } })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.gameMatchmakingMember.findMany({})
  }
}
