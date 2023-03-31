import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessage } from './entities/channel-message.entity';
import { CreateChannelMessageInput } from './dto/create-channel-message.input';
import { UpdateChannelMessageInput } from './dto/update-channel-message.input';

@Resolver(() => ChannelMessage)
export class ChannelMessagesResolver {
  constructor(private readonly channelMessagesService: ChannelMessagesService) {}

  @Mutation(() => ChannelMessage)
  createChannelMessage(@Args('createChannelMessageInput') createChannelMessageInput: CreateChannelMessageInput) {
    return this.channelMessagesService.create(createChannelMessageInput);
  }

  @Query(() => [ChannelMessage], { name: 'channelMessages' })
  findAll() {
    return this.channelMessagesService.findAll();
  }

  @Query(() => ChannelMessage, { name: 'channelMessage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelMessagesService.findOne(id);
  }

  @Mutation(() => ChannelMessage)
  updateChannelMessage(@Args('updateChannelMessageInput') updateChannelMessageInput: UpdateChannelMessageInput) {
    return this.channelMessagesService.update(updateChannelMessageInput.id, updateChannelMessageInput);
  }

  @Mutation(() => ChannelMessage)
  removeChannelMessage(@Args('id', { type: () => Int }) id: number) {
    return this.channelMessagesService.remove(id);
  }
}
