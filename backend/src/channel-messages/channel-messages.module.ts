import { Module } from '@nestjs/common'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessagesResolver } from './channel-messages.resolver'

@Module({
  providers: [ChannelMessagesResolver, ChannelMessagesService],
  imports: [],
})
export class ChannelMessagesModule {}
