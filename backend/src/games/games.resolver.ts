import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

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
