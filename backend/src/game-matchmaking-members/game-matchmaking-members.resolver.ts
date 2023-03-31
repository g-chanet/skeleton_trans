import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GameMatchmakingMembersService } from './game-matchmaking-members.service';
import { GameMatchmakingMember } from './entities/game-matchmaking-member.entity';
import { CreateGameMatchmakingMemberInput } from './dto/create-game-matchmaking-member.input';
import { UpdateGameMatchmakingMemberInput } from './dto/update-game-matchmaking-member.input';

@Resolver(() => GameMatchmakingMember)
export class GameMatchmakingMembersResolver {
  constructor(private readonly gameMatchmakingMembersService: GameMatchmakingMembersService) {}

  @Mutation(() => GameMatchmakingMember)
  createGameMatchmakingMember(@Args('createGameMatchmakingMemberInput') createGameMatchmakingMemberInput: CreateGameMatchmakingMemberInput) {
    return this.gameMatchmakingMembersService.create(createGameMatchmakingMemberInput);
  }

  @Query(() => [GameMatchmakingMember], { name: 'gameMatchmakingMembers' })
  findAll() {
    return this.gameMatchmakingMembersService.findAll();
  }

  @Query(() => GameMatchmakingMember, { name: 'gameMatchmakingMember' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameMatchmakingMembersService.findOne(id);
  }

  @Mutation(() => GameMatchmakingMember)
  updateGameMatchmakingMember(@Args('updateGameMatchmakingMemberInput') updateGameMatchmakingMemberInput: UpdateGameMatchmakingMemberInput) {
    return this.gameMatchmakingMembersService.update(updateGameMatchmakingMemberInput.id, updateGameMatchmakingMemberInput);
  }

  @Mutation(() => GameMatchmakingMember)
  removeGameMatchmakingMember(@Args('id', { type: () => Int }) id: number) {
    return this.gameMatchmakingMembersService.remove(id);
  }
}
