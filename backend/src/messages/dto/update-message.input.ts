import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  message: string;
}
