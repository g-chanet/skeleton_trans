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
    @Args(`args`) args: DTO.CreateChannelMemberInput,
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
    @Args(`args`) args: DTO.UpdateChannelMemberInput,
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
    @Args(`channelMemberId`, { type: () => String }) channelMemberId: string,
  ) {
    return await this.channelMembersService.remove(user.id, channelMemberId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [ChannelMember])
  async findAllChannelMembersForChannel(
    @Args(`channelId`, { type: () => String }) channelId: string,
  ) {
    return await this.channelMembersService.findAll({ where: { channelId } })
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
