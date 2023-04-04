import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { PrismaModule } from 'src/prisma/prisma.module'
import { GamesGateway } from './games.gateway'

@Module({
  providers: [GamesResolver, GamesService, GamesGateway],
  imports: [PrismaModule],
})
export class GamesModule {}
