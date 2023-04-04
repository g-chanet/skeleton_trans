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
  async createChannel(
    @Args(`CreateChannelInput`) args: DTO.CreateChannelInput,
  ) {
    return (await this.channelsService.create(args)) !== null
  }

  @Mutation(() => Boolean)
  async updateChannel(
    @Args(`UpdateChannelInput`) args: DTO.UpdateChannelInput,
  ) {
    return (await this.channelsService.update(args.id, args)) !== null
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Args(`id`, { type: () => String }) id: string) {
    return (await this.channelsService.remove(id)) !== null
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Channel)
  async findChannel(@Args(`id`, { type: () => String }) id: string) {
    return await this.channelsService.findOne(id)
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
