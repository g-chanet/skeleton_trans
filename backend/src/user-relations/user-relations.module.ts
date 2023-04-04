import { Module } from '@nestjs/common';
import { UserRelationsService } from './user-relations.service';
import { UserRelationsResolver } from './user-relations.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserRelationsResolver, UserRelationsService],
  imports: [PrismaModule]
})

export class UserRelationsModule {}
