import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { ChannelMessage, EChannelType } from '@prisma/client'
import { ChannelMessage as ChannelMessageEntity } from 'src/channel-messages/entities/channel-message.entity'

@ObjectType()
export class Channel {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => EChannelType)
  channelType: EChannelType

  @Field(() => Date)
  createdAt: Date

  @Field(() => ChannelMessageEntity, { nullable: true })
  channelMessages?: ChannelMessage
}

registerEnumType(EChannelType, {
  name: `EChannelType`,
})
