import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ChannelMember {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
