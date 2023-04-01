import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Channel {
  @Field(() => String)
  id: string;
}
