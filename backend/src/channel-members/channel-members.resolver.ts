import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMember } from './entities/channel-member.entity'
import {
  UseGuards,
  forwardRef,
  Inject,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import * as DTO from './dto/channel-member.input'
import { ChannelsService } from 'src/channels/channels.service'
import { PubSub } from 'graphql-subscriptions'
import { Channel } from 'src/channels/entities/channel.entity'

const PUB_UPSERT_CHANNEL_MEMBER = `onUpsertChannelMemberForUserId`
const PUB_DELETE_CHANNEL_MEMBER = `onDeleteChannelMemberForUserId`

@Resolver(() => ChannelMember)
export class ChannelMembersResolver {
  constructor(
    private readonly channelMembersService: ChannelMembersService,
    @Inject(forwardRef(() => ChannelsService))
    private readonly channelsService: ChannelsService,
    private readonly pubSub: PubSub,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async createMemberForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateMemberForChannelInput,
  ) {
    if (
      !(await this.channelsService.verifyChannelPassword(
        args.channelId,
        args.channelPassword,
      ))
    )
      throw new UnauthorizedException(`Invalid password`)
    delete args.channelPassword
    const res = await this.channelMembersService.create({
      ...args,
      userId: user.id,
    })
    const channel = await this.channelsService.findOne(args.channelId)
    await this.pubSub.publish(PUB_UPSERT_CHANNEL_MEMBER, channel)
    return res
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
    const channel = await this.channelsService.findOne(args.channelId)
    await this.pubSub.publish(PUB_DELETE_CHANNEL_MEMBER, channel)
    return await this.channelMembersService.delete(user.id, args.channelId)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [ChannelMember])
  async findAllChannelMembersForChannel(
    @Args(`args`) args: DTO.FindAllChannelMembersForChannelInput,
  ) {
    return await this.channelMembersService.findAll(args.channelId)
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => Channel, {
    filter: (payload: Channel, variables: any) => {
      return payload.channelMembers.some((member: ChannelMember) => {
        return member.userId === variables.args.userId
      })
    },
    resolve: (payload) => {
      return payload
    },
  })
  onNewChannelMemberForUserId(
    @Args(`args`) args: DTO.OnNewChannelMemberForChannelIdInput,
  ) {
    return this.pubSub.asyncIterator(PUB_UPSERT_CHANNEL_MEMBER)
  }

  @Subscription(() => Channel, {
    filter: (payload: Channel, variables: any) => {
      return payload.channelMembers.some((member: ChannelMember) => {
        return member.userId === variables.args.userId
      })
    },
    resolve: (payload) => {
      return payload
    },
  })
  onDeleteChannelMemberForUserId(
    @Args(`args`) args: DTO.OnDeleteChannelMemberForChannelIdInput,
  ) {
    return this.pubSub.asyncIterator(PUB_DELETE_CHANNEL_MEMBER)
  }
}
