import { InputType, Field } from '@nestjs/graphql';

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class UpdateMyUserInput {
  @Field(() => String)
  id: string;
}

//**************************************************//
//  QUERY
//**************************************************//

@InputType()
export class FindUserInput {
  @Field(() => String)
  id: string;
}

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
