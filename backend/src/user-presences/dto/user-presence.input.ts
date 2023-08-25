import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FindUserPresencesInput {
	@Field(() => [String])
	userIds: [string]
}
