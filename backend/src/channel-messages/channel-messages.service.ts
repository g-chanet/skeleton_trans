import { Injectable } from '@nestjs/common';
import { CreateChannelMessageInput } from './dto/create-channel-message.input';
import { UpdateChannelMessageInput } from './dto/update-channel-message.input';

@Injectable()
export class ChannelMessagesService {
  create(createChannelMessageInput: CreateChannelMessageInput) {
    return 'This action adds a new channelMessage';
  }

  findAll() {
    return `This action returns all channelMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channelMessage`;
  }

  update(id: number, updateChannelMessageInput: UpdateChannelMessageInput) {
    return `This action updates a #${id} channelMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} channelMessage`;
  }
}
