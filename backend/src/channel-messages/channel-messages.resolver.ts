import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessage } from './entities/channel-message.entity';
import { CreateMessageForChannelInput , UpdateMessageForChannelInput } from './dto/channel-message.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';

@Resolver(() => ChannelMessage)
export class ChannelMessagesResolver {
  constructor(
    private readonly channelMessagesService: ChannelMessagesService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
@Mutation(() => Boolean)
@UseGuards(GqlAuthGuard)
createMessageForChannel(
  @CtxUser() user: User, 
  @Args('CreateMessageForChannelInput') args: CreateMessageForChannelInput
  ) {
  return this.channelMessagesService.create(user.id, {...args, userId: user.id});
}

@Mutation(() => Boolean)
updateMyMessageForChannel(@Args('UpdateMessageForChannelInput') args: UpdateMessageForChannelInput) {
  return this.channelMessagesService.update(args.id, args);
}

@Mutation(() => Boolean)
removeMyMessageForChannel(@Args('ChannelMessageId', { type: () => String }) ChannelMessageId: string) {
  return this.channelMessagesService.remove(ChannelMessageId);
}

  //**************************************************//
  //  QUERY
  //**************************************************//
  @Query(() => [ChannelMessage])
  findAllChannelMessagesForChannel(@Args('channelId', { type: () => String }) channelId: string) {
    return this.channelMessagesService.findAllForChannel(channelId);
  }

//findAllChannelMessagesForChannel (ChannelMessage[])
  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}