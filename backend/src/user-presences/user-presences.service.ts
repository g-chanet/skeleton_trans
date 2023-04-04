import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserPresencesService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.UserPresenceUncheckedCreateInput) {
    return await this.prisma.userPresence.create({ data })
  }

  async update(id: string, data: Prisma.UserPresenceUncheckedUpdateInput) {
    return await this.prisma.userPresence.update({ where: { id }, data })
  }

  async remove(id: string) {
    return await this.prisma.userPresence.delete({ where: { id } })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.userPresence.findMany({})
  }

  async findOne(id: string) {
    return await this.prisma.userPresence.findFirst({ where: { id } })
  }
}
