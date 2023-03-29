import { UpdateMessageInput } from './dto/update-message.input';
import { MessagesService } from './messages.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => Message)
  createMessage(@Args('CreateMessageInput') args: CreateMessageInput) {
    return this.messagesService.create(args);
  }

  @Query(() => [Message])
  findAllMessages() {
    return this.messagesService.findAll();
  }

  @Query(() => Message)
  findMessage(@Args('uuid', { type: () => String }) uuid: string) {
    return this.messagesService.findOne(uuid);
  }

  @Mutation(() => Message)
  updateMessage(@Args('UpdateMessageInput') args: UpdateMessageInput) {
    return this.messagesService.update(args.uuid, args);
  }

  @Mutation(() => Message)
  removeMessage(@Args('uuid', { type: () => String }) uuid: string) {
    return this.messagesService.remove(uuid);
  }
}
