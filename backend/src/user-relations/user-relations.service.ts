import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { EUserRelationType } from '@prisma/client'
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions'

@Injectable()
export class UserRelationsService {
  constructor(private prisma: PrismaService) { }
  //**************************************************//
  //  MUTATION
  //**************************************************//

  async createRequestFriend(userOwnerId: string, userTargetId: string) {
    const relationOT = await this.findRelation(userOwnerId, userTargetId)
    const relationTO = await this.findRelation(userTargetId, userOwnerId)

    if (relationTO === EUserRelationType.PendingAccept)
      return await this.acceptPendingRelation(userOwnerId, userTargetId)
    if (relationTO && relationTO === EUserRelationType.Blocked) {
      throw new BadRequestException(
        `cet utilisateur n'est malheureusement pas en état de créer, tenir ou entretenir une relation avec vous. `,
      )
    }
    if (relationOT && relationOT === EUserRelationType.Blocked) {
      throw new BadRequestException(
        `tu as bloqué cet utilisateur, débloque le dans les paramètres pour l'ajouter en ami`,
      )
    }
    if (relationOT !== undefined || relationTO !== undefined)
      throw new UnauthorizedException()

    await this.prisma.userRelation.create({
      data: {
        userOwnerId: userTargetId,
        userTargetId: userOwnerId,
        type: EUserRelationType.WaitingAccept,
      },
    })
    return await this.prisma.userRelation.create({
      data: {
        userOwnerId,
        userTargetId,
        type: EUserRelationType.PendingAccept,
      },
    })
  }

  // only works if the invite is in pending mode, do not work if user is blocked
  async acceptPendingRelation(userOwnerId: string, userTargetId: string) {
    const relationOT = await this.findRelation(userOwnerId, userTargetId)
    const relationTO = await this.findRelation(userTargetId, userOwnerId)

    if (
      relationOT !== EUserRelationType.WaitingAccept &&
      relationTO !== EUserRelationType.PendingAccept
    )
      throw new UnauthorizedException()

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

  async refusePendingRelation(userOwnerId: string, userTargetId: string) {
    const relationOT = await this.findRelation(userOwnerId, userTargetId)
    const relationTO = await this.findRelation(userTargetId, userOwnerId)

    if (
      relationOT !== EUserRelationType.WaitingAccept &&
      relationTO !== EUserRelationType.PendingAccept
    )
      throw new UnauthorizedException()

    return await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: { userOwnerId, userTargetId },
      },
    })
  }

  async blockRelation(userOwnerId: string, userTargetId: string) {
    const relationOT = await this.findRelation(userOwnerId, userTargetId)
    const relationTO = await this.findRelation(userTargetId, userOwnerId)

    console.log(relationOT)
    console.log(relationTO)
    console.log(userOwnerId)
    console.log(userTargetId)
    if (relationOT) {
      await this.prisma.userRelation.delete({
        where: {
          userOwnerId_userTargetId: {
            userOwnerId,
            userTargetId,
          },
        },
      })
    }
    if (relationTO && relationTO != EUserRelationType.Blocked) {
      await this.prisma.userRelation.delete({
        where: {
          userOwnerId_userTargetId: {
            userOwnerId: userTargetId,
            userTargetId: userOwnerId,
          },
        },
      })
    }
    return await this.prisma.userRelation.create({
      data: {
        userOwnerId: userOwnerId,
        userTargetId: userTargetId,
        type: EUserRelationType.Blocked,
      },
    })
  }

  async unblockRelation(userOwnerId: string, userTargetId: string) {
    const relationOT = await this.findRelation(userOwnerId, userTargetId)
    const relationTO = await this.findRelation(userTargetId, userOwnerId)
    let res

    console.log(userOwnerId)
    console.log(userTargetId)
    if (relationOT && relationOT === EUserRelationType.Blocked) {
      res = await this.prisma.userRelation.delete({
        where: {
          userOwnerId_userTargetId: {
            userOwnerId,
            userTargetId,
          },
        },
      })
    }
    if (res) {
      return res
    }
    throw new BadRequestException(`cet utilisateur n'était pas bloqué`)
  }

  async removeFriend(userOwnerId: string, userTargetId: string) {
    await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId: userTargetId,
          userTargetId: userOwnerId,
        },
      },
    })
    return await this.prisma.userRelation.delete({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId,
          userTargetId,
        },
      },
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  async findAllForUser(userOwnerId: string) {
    return await this.prisma.userRelation.findMany({
      where: { userOwnerId },
    })
  }

  async findOne(userOwnerId: string, userTargetId: string) {
    return await this.prisma.userRelation.findUnique({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId: userOwnerId,
          userTargetId,
        },
      },
    })
  }

  async findAll() {
    return await this.prisma.userRelation.findMany({ where: {} })
  }
  //**************************************************//
  //  UTILS
  //**************************************************//

  private async findRelation(
    userAId: string,
    userBId: string,
  ): Promise<EUserRelationType | undefined> {
    const relation = await this.prisma.userRelation.findUnique({
      where: {
        userOwnerId_userTargetId: {
          userOwnerId: userAId,
          userTargetId: userBId,
        },
      },
    })
    return relation?.type
  }
}
