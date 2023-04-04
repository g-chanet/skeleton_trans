import { Module } from '@nestjs/common'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMembersResolver } from './channel-members.resolver'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [ChannelMembersResolver, ChannelMembersService],
  exports: [ChannelMembersService],
  imports: [PrismaModule],
})
export class ChannelMembersModule {}
