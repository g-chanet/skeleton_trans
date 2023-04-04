import { Field, InputType } from '@nestjs/graphql'
import { EChannelMemberType } from '@prisma/client'
//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateChannelMemberInput {
  @Field(() => String)
  channelId: string

  @Field(() => EChannelMemberType)
  type: EChannelMemberType
}

@InputType()
export class UpdateChannelMemberInput {
  @Field(() => String)
  channelId: string

  @Field(() => EChannelMemberType)
  type: EChannelMemberType
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
