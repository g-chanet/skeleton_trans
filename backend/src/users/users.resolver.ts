import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserPublic, UserPrivate } from './entities/user.entity';
import { FindUserInput, UpdateMyUserInput } from './dto/user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Boolean)
  updateMyUser(@Args('args') args: UpdateMyUserInput) {
    return this.usersService.update('', args);
  }

  @Mutation(() => Boolean)
  deleteMyUser() {
    return this.usersService.delete('');
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => UserPrivate)
  findMyUser() {
    return this.usersService.findOne('');
  }

  @Query(() => UserPublic)
  findUser(@Args('args') args: FindUserInput) {
    return this.usersService.findOne(args.id);
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
