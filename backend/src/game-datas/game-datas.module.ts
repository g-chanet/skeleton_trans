import { Module } from '@nestjs/common';
import { GameDatasService } from './game-datas.service';
import { GameDatasResolver } from './game-datas.resolver';

@Module({
  providers: [GameDatasResolver, GameDatasService]
})
export class GameDatasModule {}
