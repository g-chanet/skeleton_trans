import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Channel, EChannelMemberType } from '@prisma/client'
import { Channel as ChannelEntity } from 'src/channels/entities/channel.entity'

@ObjectType()
export class ChannelMember {
  @Field(() => String)
  channelId: string

  @Field(() => String)
  userId: string

  @Field(() => EChannelMemberType)
  type: EChannelMemberType

  @Field(() => Date)
  muted: Date

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => ChannelEntity)
  channel: Channel
}

registerEnumType(EChannelMemberType, {
  name: `EChannelMemberType`,
})
