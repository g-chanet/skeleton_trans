import { Module } from '@nestjs/common'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMembersResolver } from './game-matchmaking-members.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'
import { GamesService } from 'src/games/games.service'
import { GameMembersService } from 'src/game-members/game-members.service'
@Module({
  providers: [
    GameMatchmakingMembersResolver,
    GameMatchmakingMembersService,
    UserPresencesService,
    GamesService,
    GameMembersService,
  ],
  imports: [],
})
export class GameMatchmakingMembersModule { }
