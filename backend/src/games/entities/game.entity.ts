import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Game {
  @Field(() => String)
  id: string;
}
