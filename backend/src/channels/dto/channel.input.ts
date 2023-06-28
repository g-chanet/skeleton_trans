import { Field, InputType } from '@nestjs/graphql'
import { EChannelMemberType, EChannelType } from '@prisma/client'

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateChannelInput {
  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => EChannelType)
  channelType: EChannelType
}

@InputType()
export class UpdateChannelInput {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => EChannelType, { nullable: true })
  channelType?: EChannelType
}

@InputType()
export class DeleteChannelInput {
  @Field(() => String)
  id: string
}

@InputType()
export class JoinChannelInput {
  @Field(() => String)
  channelId: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => EChannelMemberType)
  type: EChannelMemberType
}

//**************************************************//
//  QUERY
//**************************************************//

@InputType()
export class FindChannelInput {
  @Field(() => String)
  id: string
}

//**************************************************//
//  SUBSCRIPTION
//**************************************************//

@InputType()
export class OnChannelInput {
  @Field(() => String)
  id: string
}
