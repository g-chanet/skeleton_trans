import { ChannelMembersService } from './../channel-members/channel-members.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ChannelMessagesService } from './channel-messages.service';
import { ChannelMessagesResolver } from './channel-messages.resolver';

@Module({
  providers: [ChannelMessagesResolver, ChannelMessagesService],
  imports: [ChannelMembersService, PrismaService],
})
export class ChannelMessagesModule {}
