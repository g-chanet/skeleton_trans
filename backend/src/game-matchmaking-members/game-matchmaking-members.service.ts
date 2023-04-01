import { Injectable } from '@nestjs/common';

@Injectable()
export class GameMatchmakingMembersService {
  create() {
    return 'This action adds a new gameMatchmakingMember';
  }

  findAll() {
    return `This action returns all gameMatchmakingMembers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} gameMatchmakingMember`;
  }

  update(id: string) {
    return `This action updates a #${id} gameMatchmakingMember`;
  }

  remove(id: string) {
    return `This action removes a #${id} gameMatchmakingMember`;
  }
}
