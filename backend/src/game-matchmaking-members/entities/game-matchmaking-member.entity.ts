import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class GameMatchmakingMember {
  @Field(() => String)
  userId: string
  @Field(() => String)
  message: string
  @Field(() => Boolean)
  isDeleted: boolean
}
