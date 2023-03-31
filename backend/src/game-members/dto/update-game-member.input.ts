import { CreateGameMemberInput } from './create-game-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameMemberInput extends PartialType(CreateGameMemberInput) {
  @Field(() => Int)
  id: number;
}
