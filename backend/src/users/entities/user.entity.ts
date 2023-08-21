import { ObjectType, Field } from '@nestjs/graphql'
import { GameStat } from 'src/games/entities/gameStat.entity'

@ObjectType()
export class UserPublic {
  @Field(() => ID)
  id: string

  @Field(() => String)
  username: string

  @Field(() => String, { nullable: true })
  avatarUrl?: string

  // @Field(() => String)
  // wincount: string
}

@ObjectType()
export class User extends UserPublic {
  @Field(() => Boolean)
  doubleAuth: boolean

  @Field(() => Boolean)
  isOauth: boolean
}

@ObjectType()
export class UserTwoFaSettings {
  @Field(() => String)
  googleAuthenticatorQrCode: string
}


@ObjectType()
export class DailyGameRatios {
  @Field(() => Date)
  date: Date

  @Field(() => Number)
  wins: number

  @Field(() => Number)
  losses: number

  @Field(() => Number)
  ratio: number
}

@ObjectType()
export class UserGameStats {
  @Field(() => [GameStat])
  gameStats: GameStat[]
}

@ObjectType()
export class GeneralUserGameStats {
  @Field(() => Number)
  gamesCount: number

  @Field(() => Number)
  allTimeRatio: number

  @Field(() => Number)
  MeanPoints: number
}
