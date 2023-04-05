import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { GameMembersService } from './game-members.service'
import { GameMember } from './entities/game-member.entity'
import * as DTO from './dto/game-member.input'
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator'
import { User } from '@prisma/client'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'

@Resolver(() => GameMember)
export class GameMembersResolver {
  constructor(private readonly gameMembersService: GameMembersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//
  @Mutation(() => GameMember)
  @UseGuards(GqlAuthGuard)
  async updateGameMemberForGame(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateGameMemberInput,
  ) {
    return await this.gameMembersService.update(args.gameId, user.id, args)
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
