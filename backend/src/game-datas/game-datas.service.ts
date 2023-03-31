import { Injectable } from '@nestjs/common';
import { CreateGameDataInput } from './dto/create-game-data.input';
import { UpdateGameDataInput } from './dto/update-game-data.input';

@Injectable()
export class GameDatasService {
  create(createGameDataInput: CreateGameDataInput) {
    return 'This action adds a new gameData';
  }

  findAll() {
    return `This action returns all gameDatas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gameData`;
  }

  update(id: number, updateGameDataInput: UpdateGameDataInput) {
    return `This action updates a #${id} gameData`;
  }

  remove(id: number) {
    return `This action removes a #${id} gameData`;
  }
}
