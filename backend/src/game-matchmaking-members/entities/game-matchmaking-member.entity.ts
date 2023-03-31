import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameMatchmakingMember {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
