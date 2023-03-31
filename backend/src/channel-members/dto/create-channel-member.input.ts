import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelMemberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
