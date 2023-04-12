import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data })
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  findAll(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args)
  }

  findOneByExternalOAuthId(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } })
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findOneByDiscordId(discordId: string) {
    return this.prisma.user.findUnique({ where: { discordId } })
  }
}
