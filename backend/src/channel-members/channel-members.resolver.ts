import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelMembersService } from './channel-members.service';
import { ChannelMember } from './entities/channel-member.entity';
import { CreateChannelMemberInput } from './dto/create-channel-member.input';
import { UpdateChannelMemberInput } from './dto/update-channel-member.input';

@Resolver(() => ChannelMember)
export class ChannelMembersResolver {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  @Mutation(() => ChannelMember)
  createChannelMember(
    @Args('createChannelMemberInput')
    createChannelMemberInput: CreateChannelMemberInput,
  ) {
    return this.channelMembersService.create(createChannelMemberInput);
  }

  @Query(() => [ChannelMember], { name: 'channelMembers' })
  findAll() {
    return this.channelMembersService.findAll();
  }

  @Query(() => ChannelMember, { name: 'channelMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelMembersService.findOne(id);
  }

  @Mutation(() => ChannelMember)
  updateChannelMember(
    @Args('updateChannelMemberInput')
    updateChannelMemberInput: UpdateChannelMemberInput,
  ) {
    return this.channelMembersService.update(
      updateChannelMemberInput.id,
      updateChannelMemberInput,
    );
  }

  @Mutation(() => ChannelMember)
  removeChannelMember(@Args('id', { type: () => Int }) id: number) {
    return this.channelMembersService.remove(id);
  }
}
