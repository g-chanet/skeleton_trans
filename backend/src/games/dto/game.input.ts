import { Field, InputType } from '@nestjs/graphql';

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateGameInput {
  @Field(() => [String])
  userIds: string[];
}

@InputType()
export class UpdateGameInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class JoinGameInput {
  @Field(() => String)
  id: string;
}

@InputType()
export class LeaveGameInput {
  @Field(() => String)
  id: string;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
