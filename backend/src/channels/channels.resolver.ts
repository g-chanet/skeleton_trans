import * as DTO from './dto/channel.input'
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelsService } from './channels.service'
import { Channel } from './entities/channel.entity'
import { PubSub } from 'graphql-subscriptions'

@Resolver(Channel)
export class ChannelsResolver {
  constructor(
    private readonly channelsService: ChannelsService,
    private readonly pubSub: PubSub,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Channel)
  async createChannel(@Args(`args`) args: DTO.CreateChannelInput) {
    const channel = await this.channelsService.create(args)
    return channel
  }

  @Mutation(() => Channel)
  async updateChannel(@Args(`args`) args: DTO.UpdateChannelInput) {
    const channel = await this.channelsService.update(args.id, args)
    this.pubSub.publish(`onUpdateChannel`, channel)
    return channel
  }

  @Mutation(() => Channel)
  async deleteChannel(@Args(`args`) args: DTO.DeleteChannelInput) {
    const channel = await this.channelsService.delete(args.id)
    this.pubSub.publish(`onUpdateChannel`, channel)
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
