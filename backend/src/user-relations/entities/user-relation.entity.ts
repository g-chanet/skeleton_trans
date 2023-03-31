import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserRelation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
