import { CreateGameDataInput } from './create-game-data.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameDataInput extends PartialType(CreateGameDataInput) {
  @Field(() => Int)
  id: number;
}
