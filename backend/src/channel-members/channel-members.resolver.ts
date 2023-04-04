import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ChannelMembersService } from './channel-members.service'
import { ChannelMember } from './entities/channel-member.entity'

@Resolver(() => ChannelMember)
export class ChannelMembersResolver {
  constructor(private readonly channelMembersService: ChannelMembersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
