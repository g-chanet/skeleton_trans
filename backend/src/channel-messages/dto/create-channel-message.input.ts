import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChannelMessageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
