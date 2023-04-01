import { Injectable } from '@nestjs/common';

@Injectable()
export class GameDatasService {
  create() {
    return 'This action adds a new gameData';
  }

  findAll() {
    return `This action returns all gameDatas`;
  }

  findOne(id: string) {
    return `This action returns a #${id} gameData`;
  }

  update(id: string) {
    return `This action updates a #${id} gameData`;
  }

  remove(id: string) {
    return `This action removes a #${id} gameData`;
  }
}
