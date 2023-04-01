import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameDatasService } from './game-datas.service';
import { GameData } from './entities/game-data.entity';

@Resolver(() => GameData)
export class GameDatasResolver {
  constructor(private readonly gameDatasService: GameDatasService) {}

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
