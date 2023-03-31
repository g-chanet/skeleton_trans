import { Module } from '@nestjs/common';
import { GameMembersService } from './game-members.service';
import { GameMembersResolver } from './game-members.resolver';

@Module({
  providers: [GameMembersResolver, GameMembersService]
})
export class GameMembersModule {}
