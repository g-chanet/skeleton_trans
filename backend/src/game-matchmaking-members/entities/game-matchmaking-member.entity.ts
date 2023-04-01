import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GameMatchmakingMember {
  @Field(() => String)
  id: string;
}
