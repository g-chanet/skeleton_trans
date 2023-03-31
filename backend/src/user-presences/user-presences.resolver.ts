import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserPresencesService } from './user-presences.service';
import { UserPresence } from './entities/user-presence.entity';
import { CreateUserPresenceInput } from './dto/create-user-presence.input';
import { UpdateUserPresenceInput } from './dto/update-user-presence.input';

@Resolver(() => UserPresence)
export class UserPresencesResolver {
  constructor(private readonly userPresencesService: UserPresencesService) {}

  @Mutation(() => UserPresence)
  createUserPresence(@Args('createUserPresenceInput') createUserPresenceInput: CreateUserPresenceInput) {
    return this.userPresencesService.create(createUserPresenceInput);
  }

  @Query(() => [UserPresence], { name: 'userPresences' })
  findAll() {
    return this.userPresencesService.findAll();
  }

  @Query(() => UserPresence, { name: 'userPresence' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userPresencesService.findOne(id);
  }

  @Mutation(() => UserPresence)
  updateUserPresence(@Args('updateUserPresenceInput') updateUserPresenceInput: UpdateUserPresenceInput) {
    return this.userPresencesService.update(updateUserPresenceInput.id, updateUserPresenceInput);
  }

  @Mutation(() => UserPresence)
  removeUserPresence(@Args('id', { type: () => Int }) id: number) {
    return this.userPresencesService.remove(id);
  }
}
