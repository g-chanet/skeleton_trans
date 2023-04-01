import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/user.entity';
import { GameData } from './entities/game-data.entity';
import { Game } from './entities/game.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  //**************************************************//
  //  GAME DATA
  //**************************************************//

  private rooms = new Map<string, GameData>();

  playerJoin(gameId: string, user: User) {
    return this.updateRoom({});
  }

  playerLeave(gameId: string, user: User) {
    return this.updateRoom({});
  }

  playerUpdate(gameId: string, user: User) {
    return this.updateRoom({});
  }

  updateRoom(game: Partial<GameData>) {
    if (!this.rooms.has(game.id)) {
      throw new BadRequestException(`Cannot update gameData with ${game.id}`);
    }
    return Object.assign(this.rooms[game.id], game);
  }

  createRoom(game: Game) {
    if (this.rooms.has(game.id)) {
      throw new BadRequestException(`Cannot create gameData with ${game.id}`);
    }
    return this.rooms.set(game.id, new GameData(game));
  }

  deleteRoom(game: Game) {
    if (!this.rooms.has(game.id)) {
      throw new BadRequestException(`Cannot delete gameData with ${game.id}`);
    }
    return this.rooms.delete(game.id);
  }

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async create(data: Prisma.GameCreateInput) {
    const game = await this.prisma.game.create({ data });
    this.createRoom(game);
    return game;
  }

  async update(id: string, data: Prisma.GameUpdateInput) {
    const game = await this.prisma.game.update({ where: { id }, data });
    this.updateRoom(game);
    return game;
  }

  async delete(id: string) {
    const game = await this.prisma.game.delete({ where: { id } });
    this.deleteRoom(game);
    return game;
  }

  //**************************************************//
  //  QUERY
  //**************************************************//
}
