import { Injectable } from '@nestjs/common';
import { CreateChannelMemberInput } from './dto/create-channel-member.input';
import { UpdateChannelMemberInput } from './dto/update-channel-member.input';

@Injectable()
export class ChannelMembersService {
  create(createChannelMemberInput: CreateChannelMemberInput) {
    return 'This action adds a new channelMember';
  }

  findAll() {
    return `This action returns all channelMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channelMember`;
  }

  update(id: number, updateChannelMemberInput: UpdateChannelMemberInput) {
    return `This action updates a #${id} channelMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelMember`;
  }
}
