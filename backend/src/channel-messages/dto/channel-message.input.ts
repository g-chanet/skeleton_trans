import { Field, InputType } from '@nestjs/graphql';
//**************************************************//
//  MUTATION
//**************************************************//
@InputType()
export class CreateMessageForChannelInput {
  @Field(() => String)
  message: string;

  @Field(() => String)
  channelId: string;
}

@InputType()
export class UpdateMessageForChannelInput {
    @Field(() => String)
    id: string;

    @Field(() => String)
    message: string;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
