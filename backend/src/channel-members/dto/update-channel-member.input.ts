import { CreateChannelMemberInput } from './create-channel-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelMemberInput extends PartialType(CreateChannelMemberInput) {
  @Field(() => Int)
  id: number;
}
