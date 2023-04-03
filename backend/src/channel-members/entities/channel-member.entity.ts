import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { EChannelMemberType } from '@prisma/client';
import { ChannelMessage } from 'src/channel-messages/entities/channel-message.entity';
import { Channel } from 'src/channels/entities/channel.entity';
import { User } from 'src/Users/entities/User.entity';


@ObjectType()
export class ChannelMember {
  @Field(() => String)
  channelId : string;

  @Field(() => String)
  userId : string;

  @Field(() => EChannelMemberType)
  type : EChannelMemberType;

  @Field(() => Date)
  muted : Date;

  @Field(() => Date)
  createdAt : Date;

  @Field(() => Date)
  updatedAt : Date;
}

registerEnumType(EChannelMemberType, {
  name: 'EChannelMemberType'
})