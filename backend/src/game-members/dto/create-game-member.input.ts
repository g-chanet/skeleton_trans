import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameMemberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
