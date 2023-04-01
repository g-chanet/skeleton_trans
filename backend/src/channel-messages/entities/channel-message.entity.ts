import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChannelMessage {
  @Field(() => String)
  id: string;
}
