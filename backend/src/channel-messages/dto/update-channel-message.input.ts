import { CreateChannelMessageInput } from './create-channel-message.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelMessageInput extends PartialType(CreateChannelMessageInput) {
  @Field(() => Int)
  id: number;
}
