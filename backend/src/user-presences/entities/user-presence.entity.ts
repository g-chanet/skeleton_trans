import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserPresence {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
