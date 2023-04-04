import { Module } from '@nestjs/common'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMembersResolver } from './game-matchmaking-members.resolver'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [GameMatchmakingMembersResolver, GameMatchmakingMembersService],
  imports: [PrismaModule],
})
export class GameMatchmakingMembersModule {}
