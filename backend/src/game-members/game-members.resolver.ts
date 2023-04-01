import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameMembersService } from './game-members.service';
import { GameMember } from './entities/game-member.entity';

@Resolver(() => GameMember)
export class GameMembersResolver {
  constructor(private readonly gameMembersService: GameMembersService) {}

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
