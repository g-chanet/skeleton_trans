import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { GamesGateway } from './games.gateway'
import { UsersModule } from 'src/users/users.module'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [GamesResolver, GamesService, GamesGateway, UserPresencesService],
  imports: [UsersModule],
})
export class GamesModule {}
