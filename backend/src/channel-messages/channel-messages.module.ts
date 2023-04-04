import { Module } from '@nestjs/common';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessagesResolver } from './channel-messages.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ChannelMessagesResolver, ChannelMessagesService],
  imports: [PrismaModule]
})
export class ChannelMessagesModule {}
