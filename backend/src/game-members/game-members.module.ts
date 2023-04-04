import { Module } from '@nestjs/common';
import { GameMembersService } from './game-members.service';
import { GameMembersResolver } from './game-members.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GameMembersResolver, GameMembersService],
  imports: [PrismaModule],
})
export class GameMembersModule {}
