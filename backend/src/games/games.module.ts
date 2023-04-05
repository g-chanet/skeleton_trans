import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { GamesGateway } from './games.gateway'

@Module({
  providers: [GamesResolver, GamesService, GamesGateway],
  imports: [],
})
export class GamesModule {}
