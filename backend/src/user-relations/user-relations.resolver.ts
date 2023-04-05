import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UserRelationsService } from './user-relations.service'
import { UserRelation } from './entities/user-relation.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import * as DTO from './dto/user-relation.input'

@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async createRequestFriend(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateRequestFriendInput,
  ) {
    return await this.userRelationsService.createRequestFriend(
      user.id,
      args.userTargetId,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async acceptFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.acceptPendingRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async refuseFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.refusePendingRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async blockRelation(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.blockRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async removeFriend(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.removeFriend(
      user.id,
      args.userTargetid,
    )
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  // undefined but calls are presents in service

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
