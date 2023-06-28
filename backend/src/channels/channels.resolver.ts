import * as DTO from './dto/channel.input'
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelsService } from './channels.service'
import { Channel } from './entities/channel.entity'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { ChannelMembersService } from 'src/channel-members/channel-members.service'
import { AuthHelper } from 'src/auth/auth.helper'
import { EChannelType } from '@prisma/client'
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity'

@Resolver(Channel)
export class ChannelsResolver {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly channelMembersService: ChannelMembersService,
    private readonly pubSub: PubSub,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Channel)
  @UseGuards(GqlAuthGuard)
  async createChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateChannelInput,
  ) {
    const channel = await this.channelsService.create(args)
    return channel
  }

  @Mutation(() => Channel)
  @UseGuards(GqlAuthGuard)
  async updateChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateChannelInput,
  ) {
    const channel = await this.channelsService.update(args.id, args)
    this.pubSub.publish(`onUpdateChannel`, channel)
    return channel
  }

  @Mutation(() => Channel)
  @UseGuards(GqlAuthGuard)
  // @RequirePermissions(Permission.CHANNEL_READWRITE)
  async deleteChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.DeleteChannelInput,
  ) {
    const channel = await this.channelsService.delete(args.id)
    this.pubSub.publish(`onUpdateChannel`, channel)
    return channel
  }

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async joinChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.JoinChannelInput,
  ) {
    const channel = await this.channelsService.findOne(args.channelId)
    if (
      channel.channelType === EChannelType.Protected &&
      channel.password !== (await AuthHelper.hash(args.password))
    )
      throw new UnauthorizedException(`Invalid password`)
    return await this.channelMembersService.create({
      ...args,
      userId: user.id,
    })
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Channel)
  async findChannel(@Args(`args`) args: DTO.FindChannelInput) {
    return await this.channelsService.findOne(args.id)
  }

  @Query(() => [Channel])
  async findAllChannels() {
    return await this.channelsService.findAll()
  }

  @Query(() => [Channel])
  async findAllPublicChannels(@CtxUser() user: User) {
    return await this.channelsService.findAllPublic(user.id)
  }

  @Query(() => [Channel])
  async findAllProtectedChannels(@CtxUser() user: User) {
    return await this.channelsService.findAllProtected(user.id)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => Channel, {
    filter(payload: Channel, variables: DTO.OnChannelInput) {
      return payload.id === variables.id
    },
    resolve: (value) => value,
  })
  onUpdateChannel(@Args(`args`) args: DTO.OnChannelInput) {
    return this.pubSub.asyncIterator(`onUpdateChannel`)
  }

  @Subscription(() => Channel, {
    filter(payload: Channel, variables: DTO.OnChannelInput) {
      return payload.id === variables.id
    },
    resolve: (value) => value,
  })
  onDeleteChannel(@Args(`args`) args: DTO.OnChannelInput) {
    return this.pubSub.asyncIterator(`onDeleteChannel`)
  }
}
