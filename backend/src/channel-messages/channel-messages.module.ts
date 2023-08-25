import { Module } from '@nestjs/common'
import { ChannelMessagesService } from './channel-messages.service'
import { ChannelMessagesResolver } from './channel-messages.resolver'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [
    ChannelMessagesResolver,
    ChannelMessagesService,
    UserPresencesService,
  ],
  imports: [],
})
export class ChannelMessagesModule { }
