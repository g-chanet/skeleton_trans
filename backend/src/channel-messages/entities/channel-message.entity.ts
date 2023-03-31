import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChannelMessage {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
