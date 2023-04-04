import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { EUserRelationType, Prisma } from '@prisma/client'

@Injectable()
export class UserRelationsService {
  constructor(private prisma: PrismaService) {}
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.UserRelationUncheckedCreateInput) {
    await this.prisma.userRelation.create({ data })
    const tmp = data.userOwnerId
    data.userOwnerId = data.userTargetId
    data.userTargetId = tmp
    return await this.prisma.userRelation.create({ data })
  }

  async update(
    userOwnerId: string,
    userTargetId: string,
    data: Prisma.UserRelationUncheckedUpdateInput,
  ) {
    return await this.prisma.userRelation.update({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
      data,
    })
  }

  // only works if the invite is in pending mode, do not work if user is blocked
  async acceptPendingRelation(userOwnerId: string, userTargetId: string) {
    await this.prisma.userRelation.update({
      where: {
        userOwnerId_userTargetId: {
          userTargetId: userOwnerId,
          userOwnerId: userTargetId,
        },
      },
      data: {
        type: EUserRelationType.Friend,
      },
    })
    return await this.prisma.userRelation.update({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
      data: {
        type: EUserRelationType.Friend,
      },
    })
  }

  async RefusePendingRelation(userOwnerId: string, userTargetId: string) {
    return await this.deleteBoth(userOwnerId, userTargetId)
  }

  async block(userOwnerId: string, userTargetId: string) {
    await this.prisma.userRelation.update({
      where: {
        userOwnerId_userTargetId: {
          userTargetId: userOwnerId,
          userOwnerId: userTargetId,
        },
      },
      data: {
        type: EUserRelationType.Blocked,
      },
    })
    return await this.prisma.userRelation.update({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
      data: {
        type: EUserRelationType.Blocked,
      },
    })
  }

  async deleteOne(userOwnerId: string, userTargetId: string) {
    return await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
    })
  }

  async deleteBoth(userOwnerId: string, userTargetId: string) {
    await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
    })
    return await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId: userTargetId,
          userTargetId: userOwnerId,
        },
      },
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAll() {
    return await this.prisma.userRelation.findMany({})
  }

  async findOne(userOwnerId: string, userTargetId: string) {
    return await this.prisma.userRelation.findUnique({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
    })
  }
}
