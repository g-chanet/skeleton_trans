import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data })
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } })
  }

  async deleteAll() {
    return await this.prisma.user.deleteMany({})
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        gameStats: true,
        relationFollowings: true,
      },
    })
  }

  async findAll(args: Prisma.UserFindManyArgs) {
    return await this.prisma.user.findMany(args)
  }

  async findOneByExternalOAuthId(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findOneByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username } })
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findAllUsersSorted() {
    return await this.prisma.user.findMany({})
  }
}
