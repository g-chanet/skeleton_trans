import { ObjectType, Field, Int } from '@nestjs/graphql'
import { GameMember } from 'src/game-members/entities/game-member.entity'

@ObjectType()
export class Game {
  @Field(() => String)
  id: string

  @Field(() => [GameMember])
  gameMembers?: GameMember[]
}
