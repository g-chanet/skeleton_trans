import { Field, InputType } from '@nestjs/graphql'

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateRequestFriendInput {
  @Field(() => String)
  userTargetId: string
}

@InputType()
export class UpdateUserRelationInput {
  @Field(() => String)
  userTargetid: string
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
