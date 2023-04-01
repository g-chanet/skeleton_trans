import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserPresence {
  @Field(() => String)
  id: string;
}
