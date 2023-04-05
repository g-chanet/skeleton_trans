import { Field, InputType } from '@nestjs/graphql'
//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateMemberForChannelInput {
  @Field(() => String)
  channelId: string
}

@InputType()
export class UpdateMyMemberForChannelInput {
  @Field(() => String)
  channelId: string
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

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
