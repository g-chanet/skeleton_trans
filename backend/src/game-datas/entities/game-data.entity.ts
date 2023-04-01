import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameData {
  @Field(() => String)
  id: string;
}
