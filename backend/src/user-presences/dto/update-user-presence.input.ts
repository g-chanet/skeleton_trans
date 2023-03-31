import { CreateUserPresenceInput } from './create-user-presence.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPresenceInput extends PartialType(
  CreateUserPresenceInput,
) {
  @Field(() => Int)
  id: number;
}
