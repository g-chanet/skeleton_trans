import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelMembersService {
  create() {
    return 'This action adds a new channelMember';
  }

  findAll() {
    return `This action returns all channelMembers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} channelMember`;
  }

  update(id: string) {
    return `This action updates a #${id} channelMember`;
  }

  remove(id: string) {
    return `This action removes a #${id} channelMember`;
  }
}
