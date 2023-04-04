import { Field, InputType } from "@nestjs/graphql";

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class UpdateMessageForChannelInput {
    @Field(() => String)
    id: string;

    @Field(() => Date)
    disconnectedAt: Date;
}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
