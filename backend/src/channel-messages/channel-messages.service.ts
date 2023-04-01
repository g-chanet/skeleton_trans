import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelMessagesService {
  create() {
    return 'This action adds a new channelMessage';
  }

  findAll() {
    return `This action returns all channelMessages`;
  }

  findOne(id: string) {
    return `This action returns a #${id} channelMessage`;
  }

  update(id: string) {
    return `This action updates a #${id} channelMessage`;
  }

  remove(id: string) {
    return `This action removes a #${id} channelMessage`;
  }
}
