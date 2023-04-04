import { Injectable } from '@nestjs/common'
import { EChannelMemberType } from '@prisma/client'
import { ChannelMembersService } from 'src/channel-members/channel-members.service'
import { ChannelsService } from './channels.service'

@Injectable()
export class ChannelsSecurity {
  constructor(
    private readonly channelMembersService: ChannelMembersService,
    private readonly channelsService: ChannelsService,
  ) {}

  async channelRW(channelId: string, userId: string): Promise<Boolean> {
    const channel = await this.channelsService.findOne(channelId)
    if (!channel) return false
    const member = await this.channelMembersService.findMember(
      channelId,
      userId,
    )
    if (member === undefined || member.type === EChannelMemberType.Banned)
      return false
    return true
  }

  channelR(channelId: string, userId?: string) {
    return false
  }
}
