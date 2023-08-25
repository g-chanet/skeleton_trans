import { Module } from '@nestjs/common'
import { GameMembersService } from './game-members.service'
import { GameMembersResolver } from './game-members.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [GameMembersResolver, GameMembersService, UserPresencesService],
  imports: [],
})
export class GameMembersModule { }
