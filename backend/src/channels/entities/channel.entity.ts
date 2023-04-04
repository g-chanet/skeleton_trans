import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { EChannelType } from '@prisma/client';
import { ChannelMember } from 'src/channel-members/entities/channel-member.entity';
import { ChannelMessage } from 'src/channel-messages/entities/channel-message.entity';

@ObjectType()
export class Channel {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, {nullable: true})
  avatarUrl?: string;

  @Field(() => String, {nullable: true})
  password?: string;

  @Field(() => EChannelType)
  channelType: EChannelType;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(EChannelType, {
  name: 'EChannelType'
})