import { Field, InputType } from '@nestjs/graphql'
//**************************************************//
//  MUTATION
//**************************************************//
@InputType()
export class CreateMessageForChannelInput {
  @Field(() => String)
  message: string

  @Field(() => String)
  channelId: string
}

@InputType()
export class UpdateMyMessageForChannelInput {
  @Field(() => String)
  id: string

  @Field(() => String)
  channelId: string

  @Field(() => String)
  message: string
}

@InputType()
export class DeleteMyMessageForChannelInput {
  @Field(() => String)
  id: string

  @Field(() => String)
  channelId: string

  @Field(() => String)
  message: string
}

//**************************************************//
//  QUERY
//**************************************************//

@InputType()
export class FindAllMessagesForChannelInput {
  @Field(() => String)
  channelId: string
}

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
