import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPresencesService {
  create() {
    return 'This action adds a new userPresence';
  }

  findAll() {
    return `This action returns all userPresences`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userPresence`;
  }

  update(id: string) {
    return `This action updates a #${id} userPresence`;
  }

  remove(id: string) {
    return `This action removes a #${id} userPresence`;
  }
}
