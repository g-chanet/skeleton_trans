import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameMembersService } from './game-members.service';
import { GameMember } from './entities/game-member.entity';
import { CreateGameMemberInput } from './dto/create-game-member.input';
import { UpdateGameMemberInput } from './dto/update-game-member.input';

@Resolver(() => GameMember)
export class GameMembersResolver {
  constructor(private readonly gameMembersService: GameMembersService) {}

  @Mutation(() => GameMember)
  createGameMember(@Args('createGameMemberInput') createGameMemberInput: CreateGameMemberInput) {
    return this.gameMembersService.create(createGameMemberInput);
  }

  @Query(() => [GameMember], { name: 'gameMembers' })
  findAll() {
    return this.gameMembersService.findAll();
  }

  @Query(() => GameMember, { name: 'gameMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameMembersService.findOne(id);
  }

  @Mutation(() => GameMember)
  updateGameMember(@Args('updateGameMemberInput') updateGameMemberInput: UpdateGameMemberInput) {
    return this.gameMembersService.update(updateGameMemberInput.id, updateGameMemberInput);
  }

  @Mutation(() => GameMember)
  removeGameMember(@Args('id', { type: () => Int }) id: number) {
    return this.gameMembersService.remove(id);
  }
}
