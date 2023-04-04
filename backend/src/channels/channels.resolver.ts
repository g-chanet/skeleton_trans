import * as DTO from './dto/channel.input'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelsService } from './channels.service'
import { Channel } from './entities/channel.entity'

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Boolean)
  async createChannel(@Args(`args`) args: DTO.CreateChannelInput) {
    return (await this.channelsService.create(args)) !== null
  }

  @Mutation(() => Boolean)
  async updateChannel(@Args(`args`) args: DTO.UpdateChannelInput) {
    return (await this.channelsService.update(args.id, args)) !== null
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Args(`args`) args: DTO.DeleteChannelInput) {
    return (await this.channelsService.delete(args.id)) !== null
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

  //onUpdateChannel (Channel)
  //onDeleteChannel (Channel)
  //onCreatePublicChannel (Channel)
  //onUpdatePublicChannel (Channel)
  //onDeletePublicChannel (Channel)
}
