import { Resolver } from '@nestjs/graphql'
import { GameMatchmakingMembersService } from './game-matchmaking-members.service'
import { GameMatchmakingMember } from './entities/game-matchmaking-member.entity'

@Resolver(() => GameMatchmakingMember)
export class GameMatchmakingMembersResolver {
  constructor(
    private readonly gameMatchmakingMembersService: GameMatchmakingMembersService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
