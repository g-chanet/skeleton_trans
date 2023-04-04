import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserPresence {
  @Field(() => String)
  id: string;
  
  @Field(() => String)
  userId: String;

  @Field(() => Date)
  connectedAt: Date;

  @Field(() => Date)
  disconnectedAt: Date;
}
