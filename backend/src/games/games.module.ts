import { Module } from '@nestjs/common'
import { GamesService } from './games.service'
import { GamesResolver } from './games.resolver'
import { UsersModule } from 'src/users/users.module'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [GamesResolver, GamesService, UserPresencesService],
  imports: [UsersModule],
})
export class GamesModule {}
