import { Injectable } from '@nestjs/common';
import { CreateGameMemberInput } from './dto/create-game-member.input';
import { UpdateGameMemberInput } from './dto/update-game-member.input';

@Injectable()
export class GameMembersService {
  create(createGameMemberInput: CreateGameMemberInput) {
    return 'This action adds a new gameMember';
  }

  findAll() {
    return `This action returns all gameMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameMember`;
  }

  update(id: number, updateGameMemberInput: UpdateGameMemberInput) {
    return `This action updates a #${id} gameMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameMember`;
  }
}
