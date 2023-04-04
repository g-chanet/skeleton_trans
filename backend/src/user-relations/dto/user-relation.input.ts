import { Field, InputType } from '@nestjs/graphql';
import { EUserRelationType } from '@prisma/client';

//**************************************************//
//  MUTATION
//**************************************************//

@InputType()
export class CreateUserRelationInput {
	
	@Field(() => String)
	userTargetId: string;

	@Field(() => EUserRelationType)
	type: EUserRelationType;
}

@InputType()
export class UpdateUserRelationInput {
	@Field(() => String)
	userTargetid: string;

}

//**************************************************//
//  QUERY
//**************************************************//

//**************************************************//
//  SUBSCRIPTION
//**************************************************//
