import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessage } from './entities/channel-message.entity'
import * as DTO from './dto/channel-message.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'
import { PubSub } from 'graphql-subscriptions'

const PUB_NEW_CHANNEL_MESSAGE = `newChannelMessage`

const pubSub = new PubSub()

@Resolver(() => ChannelMessage)
export class ChannelMessagesResolver {
  constructor(
    private readonly channelMessagesService: ChannelMessagesService,
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
    console.log(`avant`)
    await pubSub.publish(`toto`, { toto: res })
    console.log(`apres`)
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

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//

  @Subscription(() => ChannelMessage, {
    filter(
      payload: ChannelMessage,
      variables: DTO.OnNewChannelMessageForChannelIdInput,
    ) {
      console.log(`filtre`)
      return payload.channelId === variables.channelId
    },
  })
  onNewChannelMessageForChannelId(
    @Args(`args`) args: DTO.OnNewChannelMessageForChannelIdInput,
  ) {
    console.log(`oui`)
    return pubSub.asyncIterator(`toto`)
  }
}
