import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UserRelationsService } from './user-relations.service'
import { UserRelation } from './entities/user-relation.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import {
  CreateUserRelationInput,
  UpdateUserRelationInput,
} from './dto/user-relation.input'

@Resolver(() => UserRelation)
export class UserRelationsResolver {
  constructor(private readonly userRelationsService: UserRelationsService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  // protect if the request already exist ?
  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async createRequestWaitingFriends(
    @CtxUser() user: User,
    @Args(`args`) args: CreateUserRelationInput,
  ) {
    return await this.userRelationsService.create({
      ...args,
      userOwnerId: user.id,
    })
  }

  // set up gards if the user relation is blocked ?
  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async acceptFriendRequest(
    @CtxUser() user: User,
    @Args(`args`) args: UpdateUserRelationInput,
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
    @Args(`args`) args: UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.RefusePendingRelation(
      user.id,
      args.userTargetid,
    )
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async blockRelation(
    @CtxUser() user: User,
    @Args(`args`) args: UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.block(user.id, args.userTargetid)
  }

  @Mutation(() => UserRelation)
  @UseGuards(GqlAuthGuard)
  async removeRelation(
    @CtxUser() user: User,
    @Args(`args`) args: UpdateUserRelationInput,
  ) {
    return await this.userRelationsService.deleteBoth(
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
