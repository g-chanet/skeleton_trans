import { Module, forwardRef } from '@nestjs/common'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMembersResolver } from './channel-members.resolver'
import { ChannelsModule } from 'src/channels/channels.module'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [
    ChannelMembersResolver,
    ChannelMembersService,
    UserPresencesService,
  ],
  exports: [ChannelMembersService],
  imports: [forwardRef(() => ChannelsModule)],
})
export class ChannelMembersModule { }
