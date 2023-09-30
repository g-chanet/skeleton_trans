import { Module } from '@nestjs/common'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMembersResolver } from './game-matchmaking-members.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'
import { GamesService } from 'src/games/games.service'
@Module({
  providers: [
    GameMatchmakingMembersResolver,
    GameMatchmakingMembersService,
    UserPresencesService,
    GamesService,
  ],
  imports: [],
})
export class GameMatchmakingMembersModule { }
