import { Module } from '@nestjs/common';
import { UserPresencesService } from './user-presences.service';
import { UserPresencesResolver } from './user-presences.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserPresencesResolver, UserPresencesService],
  imports:[PrismaModule]
})
export class UserPresencesModule {}
