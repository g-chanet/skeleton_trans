import { ObjectType, Field, ID } from '@nestjs/graphql'

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
}
