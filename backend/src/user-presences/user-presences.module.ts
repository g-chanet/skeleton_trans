import { Module } from '@nestjs/common';
import { UserPresencesService } from './user-presences.service';
import { UserPresencesResolver } from './user-presences.resolver';

@Module({
  providers: [UserPresencesResolver, UserPresencesService]
})
export class UserPresencesModule {}
