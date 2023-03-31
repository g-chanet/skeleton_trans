import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGameMatchmakingMemberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
