import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessage } from './entities/channel-message.entity';

@Resolver(() => ChannelMessage)
export class ChannelMessagesResolver {
  constructor(
    private readonly channelMessagesService: ChannelMessagesService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
