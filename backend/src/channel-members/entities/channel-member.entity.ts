import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { EChannelMemberType } from '@prisma/client'

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
}

registerEnumType(EChannelMemberType, {
  name: `EChannelMemberType`,
})
