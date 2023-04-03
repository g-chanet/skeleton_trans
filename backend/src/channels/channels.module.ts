import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ChannelsResolver, ChannelsService],
  imports: [PrismaModule]
})
export class ChannelsModule {}
