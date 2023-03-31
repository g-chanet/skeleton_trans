import { Test, TestingModule } from '@nestjs/testing';
import { GameDatasResolver } from './game-datas.resolver';
import { GameDatasService } from './game-datas.service';

describe('GameDatasResolver', () => {
  let resolver: GameDatasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameDatasResolver, GameDatasService],
    }).compile();

    resolver = module.get<GameDatasResolver>(GameDatasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
