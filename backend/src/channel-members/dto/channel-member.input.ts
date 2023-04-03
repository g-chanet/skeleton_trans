import { Field, InputType } from '@nestjs/graphql';
import { EChannelMemberType } from '@prisma/client';
//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class createChannelMemberInput {
    @Field(() => String)
    channelId : string;
  
    @Field(() => EChannelMemberType)
    type : EChannelMemberType;
}

@InputType()
export class updateChannelMemberInput {
    @Field(() => String)
    channelId : string;

    @Field(() => String)
    userId : string;
  
    @Field(() => EChannelMemberType)
    type : EChannelMemberType;
    //sudo ?
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
