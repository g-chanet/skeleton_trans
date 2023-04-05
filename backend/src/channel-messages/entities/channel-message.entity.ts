import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ChannelMessage {
  @Field(() => String)
  id: string

  @Field(() => String)
  message: string

  @Field(() => String)
  channelId: string

  @Field(() => String)
  userId: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
