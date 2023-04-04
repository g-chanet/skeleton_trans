import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GameMember {
  @Field(() => String)
  gameId: string;

  @Field(() => String)
  userId: string;
}
