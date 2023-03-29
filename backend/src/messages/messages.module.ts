import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MessagesResolver, MessagesService],
  imports: [PrismaModule],
})
export class MessagesModule {}
