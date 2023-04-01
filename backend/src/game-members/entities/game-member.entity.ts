import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameMember {
  @Field(() => String)
  id: string;
}
