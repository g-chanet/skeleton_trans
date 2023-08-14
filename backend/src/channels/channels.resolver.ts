import * as DTO from './dto/channel.input'
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelsService } from './channels.service'
import { Channel } from './entities/channel.entity'
import { PubSub } from 'graphql-subscriptions'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import {
  Inject,
  UnauthorizedException,
  UseGuards,
  forwardRef,
} from '@nestjs/common'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { EChannelMemberType, EChannelType } from '@prisma/client'
import { ChannelMembersService } from 'src/channel-members/channel-members.service'

const PUB_INSERT_CHANNEL = `onInsertChannel`
const PUB_UPDATE_CHANNEL = `onUpdateChannel`
const PUB_DELETE_CHANNEL = `onDeleteChannel`

@Resolver(Channel)
export class ChannelsResolver {
  constructor(
    private readonly channelsService: ChannelsService,
    @Inject(forwardRef(() => ChannelMembersService))
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
    this.pubSub.publish(PUB_INSERT_CHANNEL, channel)
    return channel
  }

  @Mutation(() => Channel)
  @UseGuards(GqlAuthGuard)
  async updateChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateChannelInput,
  ) {
    const member = await this.channelMembersService.findOne(args.id, user.id)
    if (member.type !== EChannelMemberType.Owner)
      throw new UnauthorizedException(`Invalid member type`)
    const channel = await this.channelsService.update(
      args.id,
      args.password,
      args,
    )
    this.pubSub.publish(PUB_UPDATE_CHANNEL, channel)
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
    this.pubSub.publish(PUB_DELETE_CHANNEL, channel)
    return channel
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

  @Query(() => [Channel])
  async findAllChannelsForUser(@CtxUser() user: User) {
    return await this.channelsService.findAllForUser(user.id)
  }

  @Query(() => Boolean)
  async checkChannelName(@Args(`args`) args: DTO.CheckChannelInput) {
    return await this.channelsService.checkChannelName(args.channelName)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => Channel, {
    filter(payload: Channel, variables: DTO.OnChannelInput) {
      return payload.channelType !== EChannelType.Private
    },
    resolve: (value) => value,
  })
  onCreateChannel() {
    return this.pubSub.asyncIterator(PUB_INSERT_CHANNEL)
  }

  @Subscription(() => Channel, {
    filter(payload: Channel, variables: any) {
      return payload.id === variables.args.id
    },
    resolve: (value) => value,
  })
  onUpdateChannel(@Args(`args`) args: DTO.OnChannelInput) {
    return this.pubSub.asyncIterator(PUB_UPDATE_CHANNEL)
  }

  @Subscription(() => Channel, {
    filter(payload: Channel, variables: any) {
      return payload.id === variables.args.id
    },
    resolve: (value) => value,
  })
  onDeleteChannel(@Args(`args`) args: DTO.OnChannelInput) {
    return this.pubSub.asyncIterator(PUB_DELETE_CHANNEL)
  }
}
