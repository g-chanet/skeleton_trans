import { Field, InputType } from '@nestjs/graphql';
//**************************************************//
//  MUTATION
//**************************************************//
@InputType()
export class CreateGameMemberInput {
  @Field(() => String)
  message: string;

  @Field(() => String)
  channelId: string;
}

@InputType()
export class UpdateGameMemberInput {
    @Field(() => String)
    id: string;

    @Field(() => String)
    channelId: string;

    @Field(() => String)
    message: string;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
