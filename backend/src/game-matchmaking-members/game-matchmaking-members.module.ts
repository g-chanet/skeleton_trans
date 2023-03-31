import { Module } from '@nestjs/common';
import { GameMatchmakingMembersService } from './game-matchmaking-members.service';
import { GameMatchmakingMembersResolver } from './game-matchmaking-members.resolver';

@Module({
  providers: [GameMatchmakingMembersResolver, GameMatchmakingMembersService],
})
export class GameMatchmakingMembersModule {}
