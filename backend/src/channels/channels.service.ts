import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelsService {
  create() {
    return 'This action adds a new channel';
  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: string) {
    return `This action returns a #${id} channel`;
  }

  update(id: string) {
    return `This action updates a #${id} channel`;
  }

  remove(id: string) {
    return `This action removes a #${id} channel`;
  }
}
