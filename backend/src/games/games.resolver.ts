import { UseGuards } from '@nestjs/common'
import { GameData } from './entities/game-data.entity'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { GamesService } from './games.service'
import { Game } from './entities/game.entity'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'
import { User } from 'src/users/entities/user.entity'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import * as DTO from './dto/game.input'

@Resolver(() => Game)
@UseGuards(GqlAuthGuard)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => GameData)
  createGame(@CtxUser() user: User, @Args(`args`) args: DTO.CreateGameInput) {
    return this.gamesService.create({
      ...args,
      gameMembers: {
        createMany: {
          data: args.userIds.map((e) => ({
            userId: e,
          })),
        },
      },
    })
  }

  @Mutation(() => GameData)
  updateGame(@CtxUser() user: User, @Args(`args`) args: DTO.UpdateGameInput) {
    return this.gamesService.update(args.id, args)
  }

  @Mutation(() => GameData)
  joinGame(@CtxUser() user: User, @Args(`args`) args: DTO.JoinGameInput) {
    return this.gamesService.playerJoin(args.id, user)
  }

  @Mutation(() => Boolean)
  leaveGame(@CtxUser() user: User, @Args(`args`) args: DTO.LeaveGameInput) {
    return this.gamesService.playerLeave(args.id, user)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
