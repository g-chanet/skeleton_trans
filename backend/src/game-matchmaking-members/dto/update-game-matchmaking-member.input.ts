import { CreateGameMatchmakingMemberInput } from './create-game-matchmaking-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameMatchmakingMemberInput extends PartialType(CreateGameMatchmakingMemberInput) {
  @Field(() => Int)
  id: number;
}
