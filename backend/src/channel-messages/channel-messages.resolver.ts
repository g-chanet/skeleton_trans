import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessage } from './entities/channel-message.entity'
import * as DTO from './dto/channel-message.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User, UserPublic } from 'src/users/entities/user.entity'
import { PubSub } from 'graphql-subscriptions'

const PUB_NEW_CHANNEL_MESSAGE = `onNewChannelMessageForChannelId`

@Resolver(() => ChannelMessage)
export class ChannelMessagesResolver {
  constructor(
    private readonly channelMessagesService: ChannelMessagesService,
    private readonly pubSub: PubSub,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => ChannelMessage)
  @UseGuards(GqlAuthGuard)
  async createMessageForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.CreateMessageForChannelInput,
  ) {
    const res = await this.channelMessagesService.create({
      ...args,
      userId: user.id,
    })
    await this.pubSub.publish(PUB_NEW_CHANNEL_MESSAGE, res)
    return res
  }

  @Mutation(() => ChannelMessage)
  @UseGuards(GqlAuthGuard)
  async updateMyMessageForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateMyMessageForChannelInput,
  ) {
    return await this.channelMessagesService.update(args.id, user.id, args)
  }

  @Mutation(() => ChannelMessage)
  @UseGuards(GqlAuthGuard)
  async deleteMyMessageForChannel(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.DeleteMyMessageForChannelInput,
  ) {
    return await this.channelMessagesService.delete(args.id, user.id)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [ChannelMessage])
  async findAllChannelMessagesForChannel(
    @Args(`args`) args: DTO.FindAllMessagesForChannelInput,
  ) {
    return await this.channelMessagesService.findAllForChannel(args.channelId)
  }

  @Query(() => UserPublic)
  async findUserForChannelMessage(
    @Args(`args`) args: DTO.FindUserForChannelMessageInput,
  ) {
    return (
      await this.channelMessagesService.findUserForChannelMessage(args.id)
    ).user
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => ChannelMessage, {
    filter: (payload: ChannelMessage, variables: any) =>
      payload.channelId === variables.args.channelId,
    resolve: (payload) => {
      return payload
    },
  })
  onNewChannelMessageForChannelId(
    @Args(`args`) args: DTO.OnNewChannelMessageForChannelIdInput,
  ) {
    return this.pubSub.asyncIterator(PUB_NEW_CHANNEL_MESSAGE)
  }
}
