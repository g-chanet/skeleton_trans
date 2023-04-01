import { Injectable } from '@nestjs/common';

@Injectable()
export class GameMembersService {
  create() {
    return 'This action adds a new gameMember';
  }

  findAll() {
    return `This action returns all gameMembers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} gameMember`;
  }

  update(id: string) {
    return `This action updates a #${id} gameMember`;
  }

  remove(id: string) {
    return `This action removes a #${id} gameMember`;
  }
}
