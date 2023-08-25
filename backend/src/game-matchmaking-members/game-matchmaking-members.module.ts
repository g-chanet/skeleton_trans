import { Module } from '@nestjs/common'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMembersResolver } from './game-matchmaking-members.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'
@Module({
  providers: [
    GameMatchmakingMembersResolver,
    GameMatchmakingMembersService,
    UserPresencesService,
  ],
  imports: [],
})
export class GameMatchmakingMembersModule { }
