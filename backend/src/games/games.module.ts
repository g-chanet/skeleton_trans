import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { GamesGateway } from './games.gateway'
import { UsersModule } from 'src/users/users.module'

@Module({
  providers: [GamesResolver, GamesService, GamesGateway],
  imports: [UsersModule],
})
export class GamesModule {}
