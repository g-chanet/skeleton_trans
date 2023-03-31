import { Injectable } from '@nestjs/common';
import { CreateUserPresenceInput } from './dto/create-user-presence.input';
import { UpdateUserPresenceInput } from './dto/update-user-presence.input';

@Injectable()
export class UserPresencesService {
  create(createUserPresenceInput: CreateUserPresenceInput) {
    return 'This action adds a new userPresence';
  }

  findAll() {
    return `This action returns all userPresences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPresence`;
  }

  update(id: number, updateUserPresenceInput: UpdateUserPresenceInput) {
    return `This action updates a #${id} userPresence`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPresence`;
  }
}
