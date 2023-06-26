import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMember } from './entities/channel-member.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import * as DTO from './dto/channel-member.input'

@Resolver(() => ChannelMember)
export class ChannelMembersResolver {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async createMemberForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateMemberForChannelInput,
  ) {
    return await this.channelMembersService.create({
      ...args,
      userId: user.id,
    })
  }

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async updateMyMemberForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateMyMemberForChannelInput,
  ) {
    return await this.channelMembersService.update(
      user.id,
      args.channelId,
      args,
    )
  }

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async deleteMyMemberForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.DeleteMyMemberForChannelInput,
  ) {
    return await this.channelMembersService.delete(user.id, args.channelId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [ChannelMember])
  async findAllChannelMembersForChannel(
    @Args(`args`) args: DTO.FindAllChannelMembersForChannelInput,
  ) {
    return await this.channelMembersService.findAll({
      where: { channelId: args.channelId },
    })
  }

  @Query(() => [ChannelMember])
  async findAllChannelMembersForUser(
    @Args(`args`) args: DTO.FindAllChannelMembersForUserInput,
  ) {
    return await this.channelMembersService.findAllForUser(args.userId)
  }
  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
