import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';

@ObjectType()
export class PlayerData {
  constructor(data: Partial<PlayerData>) {
    Object.assign(this, data);
  }

  @Field(() => Int)
  position: number;

  @Field(() => String)
  userId: string;
}

@ObjectType()
export class GameData extends Game {
  constructor(data: Game) {
    super();
    Object.assign(this, data);
  }

  players = new Map<string, PlayerData>();
}
