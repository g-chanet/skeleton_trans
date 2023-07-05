import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { Channel, EChannelMemberType, User } from '@prisma/client'
import { Channel as ChannelEntity } from 'src/channels/entities/channel.entity'
import { UserPublic } from 'src/users/entities/user.entity'

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

  @Field(() => ChannelEntity, { nullable: true })
  channel?: Channel

  @Field(() => UserPublic, { nullable: true })
  user?: User
}

registerEnumType(EChannelMemberType, {
  name: `EChannelMemberType`,
})
