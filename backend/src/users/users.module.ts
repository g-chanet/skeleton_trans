import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [],
})
export class UsersModule {}
