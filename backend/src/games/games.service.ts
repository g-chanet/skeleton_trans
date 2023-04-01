import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  create() {
    return 'This action adds a new game';
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: string) {
    return `This action returns a #${id} game`;
  }

  update(id: string) {
    return `This action updates a #${id} game`;
  }

  remove(id: string) {
    return `This action removes a #${id} game`;
  }
}
