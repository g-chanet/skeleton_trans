import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessage } from './entities/channel-message.entity'
import * as DTO from './dto/channel-message.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from 'src/users/entities/user.entity'

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
    return await this.channelMessagesService.create({
      ...args,
      userId: user.id,
    })
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
}
