import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameMember {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
