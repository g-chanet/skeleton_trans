import { Module } from '@nestjs/common'
import { UserRelationsService } from './user-relations.service'
import { UserRelationsResolver } from './user-relations.resolver'

@Module({
  providers: [UserRelationsResolver, UserRelationsService],
  imports: [],
})
export class UserRelationsModule {}
