import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  message: string;
}
