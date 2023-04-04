import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ChannelMembersService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  create() {
    return `This action add`
  }

  update(id: string) {
    return `This action updates a #${id}`
  }

  remove(id: string) {
    return `This action removes a #${id}`
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findMember(channelId: string, userId: string) {
    return await this.prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
    })
  }

  findAll() {}

  async findOne(channelId: string, userId: string) {
    return await this.prisma.channelMember.findUnique({
      where: { channelId_userId: { userId, channelId } },
    })
  }
}
