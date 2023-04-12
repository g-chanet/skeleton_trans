import { Field, InputType } from '@nestjs/graphql';
import { EChannelMemberType } from '@prisma/client';
//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class createChannelMemberInput {
    @Field(() => String)
    UserId : string;
  
    @Field(() => EChannelMemberType)
    type : EChannelMemberType;
}

@InputType()
export class updateChannelMemberInput {
    @Field(() => String)
    channelMemberId : string;

    @Field(() => String)
    userId : string;
  
    @Field(() => EChannelMemberType)
    type : EChannelMemberType;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
