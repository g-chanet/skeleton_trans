import { Module } from '@nestjs/common'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessagesResolver } from './channel-messages.resolver'
import { ChannelMembersModule } from 'src/channel-members/channel-members.module'
import { UserPresencesModule } from 'src/user-presences/user-presences.module'

@Module({
  providers: [ChannelMessagesResolver, ChannelMessagesService],
  imports: [ChannelMembersModule, UserPresencesModule],
})
export class ChannelMessagesModule {}
