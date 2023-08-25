import { Module } from '@nestjs/common'
import { UserPresencesService } from './user-presences.service'
import { UserPresencesResolver } from './user-presences.resolver'
import { PubSubModule } from 'src/pub-sub/pub-sub.module'

@Module({
  providers: [UserPresencesResolver, UserPresencesService],
  imports: [PubSubModule],
})
export class UserPresencesModule { }
