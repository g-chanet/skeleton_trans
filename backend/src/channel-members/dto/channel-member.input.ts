import { Field, InputType } from '@nestjs/graphql'
import { EChannelMemberType } from '@prisma/client'
//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateMemberForChannelInput {
  @Field(() => String)
  channelId: string

  @Field(() => String, { nullable: true })
  channelPassword?: string

  @Field(() => EChannelMemberType, { nullable: true })
  type?: EChannelMemberType
}

@InputType()
export class UpdateMyMemberForChannelInput {
  @Field(() => String)
  channelId: string

  @Field(() => EChannelMemberType)
  type: EChannelMemberType
}

@InputType()
export class DeleteMyMemberForChannelInput {
  @Field(() => String)
  channelId: string
}

//**************************************************//
//  QUERY
//**************************************************//

@InputType()
export class FindAllChannelMembersForChannelInput {
  @Field(() => String)
  channelId: string
}

@InputType()
export class FindAllChannelMembersForUserInput {
  @Field(() => String)
  userId: string
}

//**************************************************//
//  SUBSCRIPTION
//**************************************************//

@InputType()
export class OnNewChannelMemberForChannelIdInput {
  @Field(() => String)
  userId: string
}
