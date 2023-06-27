import { Injectable } from '@nestjs/common'
import { EChannelType, Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.ChannelCreateInput) {
    return await this.prisma.channel.create({ data })
  }

  async update(id: string, data: Prisma.ChannelUpdateInput) {
    return await this.prisma.channel.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.prisma.channel.delete({ where: { id } })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.channel.findMany({})
  }

  async findAllPublic() {
    return await this.prisma.channel.findMany({
      where: { channelType: EChannelType.Public },
    })
  }

  async findOne(id: string) {
    return await this.prisma.channel.findFirst({ where: { id } })
  }
}
