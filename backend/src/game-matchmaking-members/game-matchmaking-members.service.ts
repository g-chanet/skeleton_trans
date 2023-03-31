import { Injectable } from '@nestjs/common';
import { CreateGameMatchmakingMemberInput } from './dto/create-game-matchmaking-member.input';
import { UpdateGameMatchmakingMemberInput } from './dto/update-game-matchmaking-member.input';

@Injectable()
export class GameMatchmakingMembersService {
  create(createGameMatchmakingMemberInput: CreateGameMatchmakingMemberInput) {
    return 'This action adds a new gameMatchmakingMember';
  }

  findAll() {
    return `This action returns all gameMatchmakingMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameMatchmakingMember`;
  }

  update(id: number, updateGameMatchmakingMemberInput: UpdateGameMatchmakingMemberInput) {
    return `This action updates a #${id} gameMatchmakingMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameMatchmakingMember`;
  }
}
