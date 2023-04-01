import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserRelation {
  @Field(() => String)
  id: string;
}
