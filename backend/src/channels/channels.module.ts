import { ChannelMembersModule } from './../channel-members/channel-members.module'
import { Module } from '@nestjs/common'
import { ChannelsService } from './channels.service'
import { ChannelsResolver } from './channels.resolver'
import { ChannelsSecurity } from './channels.security'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [ChannelsResolver, ChannelsService, ChannelsSecurity],
  imports: [PrismaModule, ChannelMembersModule],
})
export class ChannelsModule {}
