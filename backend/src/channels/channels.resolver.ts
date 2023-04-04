import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelsService } from './channels.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput, UpdateChannelInput } from './dto/channel.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';
import { User } from '@prisma/client';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(()=> Boolean)
  async createChannel (@Args('CreateChannelInput') args: CreateChannelInput) {
    return (await this.channelsService.create(args)) !== null;
  }

  @Mutation(()=> Boolean)
  async updateChannel (@Args('UpdateChannelInput') args: UpdateChannelInput) {
    return (await this.channelsService.update(args.id, args)) !== null;
  }

  @Mutation(()=> Boolean)
  async deleteChannel (@Args('id', { type: () => String }) id: string) {
    return (await this.channelsService.remove(id)) !== null;
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => Channel)
  async findChannel(@Args('id', { type: () => String }) id: string) {
    return await this.channelsService.findOne(id);
  }

  @Query(() => [Channel])
  async findAllChannels() {
    return await this.channelsService.findAll();
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
