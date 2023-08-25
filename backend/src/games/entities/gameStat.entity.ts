import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class GameStat {
	@Field(() => String)
	id: string

	@Field(() => User)
	user: User

	@Field(() => String)
	opponentId: String

	@Field(() => Boolean)
	isWinner: Boolean

	@Field(() => String)
	userScore: String

	@Field(() => String)
	opponentScore: String

	@Field(() => String)
	createdAt: String
}
