import { Module } from '@nestjs/common'
import { UserRelationsService } from './user-relations.service'
import { UserRelationsResolver } from './user-relations.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [
    UserRelationsResolver,
    UserRelationsService,
    UserPresencesService,
  ],
  imports: [],
})
export class UserRelationsModule { }
