import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class ChannelMember {
  @Field(() => String)
  id: string
}
