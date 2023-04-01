import { InputType, Field } from '@nestjs/graphql';

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class SignInLocalInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  emailOrUsername: string;
}

@InputType()
export class SignUpLocalInput {
  @Field(() => String)
  password: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
