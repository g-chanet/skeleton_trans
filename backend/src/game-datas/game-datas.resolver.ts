import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameDatasService } from './game-datas.service';
import { GameData } from './entities/game-data.entity';
import { CreateGameDataInput } from './dto/create-game-data.input';
import { UpdateGameDataInput } from './dto/update-game-data.input';

@Resolver(() => GameData)
export class GameDatasResolver {
  constructor(private readonly gameDatasService: GameDatasService) {}

  @Mutation(() => GameData)
  createGameData(@Args('createGameDataInput') createGameDataInput: CreateGameDataInput) {
    return this.gameDatasService.create(createGameDataInput);
  }

  @Query(() => [GameData], { name: 'gameDatas' })
  findAll() {
    return this.gameDatasService.findAll();
  }

  @Query(() => GameData, { name: 'gameData' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameDatasService.findOne(id);
  }

  @Mutation(() => GameData)
  updateGameData(@Args('updateGameDataInput') updateGameDataInput: UpdateGameDataInput) {
    return this.gameDatasService.update(updateGameDataInput.id, updateGameDataInput);
  }

  @Mutation(() => GameData)
  removeGameData(@Args('id', { type: () => Int }) id: number) {
    return this.gameDatasService.remove(id);
  }
}
