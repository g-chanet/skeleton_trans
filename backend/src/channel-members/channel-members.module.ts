import { Module } from '@nestjs/common'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMembersResolver } from './channel-members.resolver'

@Module({
  providers: [ChannelMembersResolver, ChannelMembersService],
  exports: [ChannelMembersService],
  imports: [],
})
export class ChannelMembersModule {}
