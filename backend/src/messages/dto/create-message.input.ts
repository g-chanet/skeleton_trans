import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  message: string;
}
