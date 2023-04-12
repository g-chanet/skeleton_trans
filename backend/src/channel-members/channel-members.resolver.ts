import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelMembersService } from './channel-members.service';
import { ChannelMember } from './entities/channel-member.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => ChannelMember)
export class ChannelMembersResolver {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async createMemberForChannel(
    @CtxUser() user: User,
    @Args('args') args: createChannelMemberInput,
  ) {
    return await this.channelMembersService.create({
      ...args,
      userId: user.id,
    });
  }

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async updateMyMemberForChannel(
    @CtxUser() user: User,
    @Args('channelMemberId', { type: () => String }) channelMemberId: string,
  ) {
    return await this.channelMembersService.update(user.id, channelMemberId);
  }

  @Mutation(() => ChannelMember)
  @UseGuards(GqlAuthGuard)
  async deleteMyMemberForChannel(
    @CtxUser() user: User,
    @Args('channelMemberId', { type: () => String }) channelMemberId: string,
  ) {
    return await this.channelMembersService.remove(user.id, channelMemberId);
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => [ChannelMember])
  async findAllChannelMembersForChannel(
    @CtxUser() user: User,
    @Args('channelId', { type: () => String }) channelId: string,
  ) {
    return await this.channelMembersService.findAll();
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
