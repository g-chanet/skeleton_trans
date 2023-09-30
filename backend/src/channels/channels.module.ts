import { ChannelMembersModule } from './../channel-members/channel-members.module'
import { Module, forwardRef } from '@nestjs/common'
import { ChannelsService } from './channels.service'
import { ChannelsResolver } from './channels.resolver'
import { ChannelsSecurity } from './channels.security'
import { UserPresencesService } from 'src/user-presences/user-presences.service'

@Module({
  providers: [
    ChannelsResolver,
    ChannelsService,
    ChannelsSecurity,
    UserPresencesService,
  ],
  exports: [ChannelsService],
  imports: [forwardRef(() => ChannelMembersModule)],
})
export class ChannelsModule { }
