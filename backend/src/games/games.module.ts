import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GamesResolver, GamesService],
  imports: [PrismaModule],
})
export class GamesModule {}
