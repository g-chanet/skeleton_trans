import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserPublic, UserPrivate } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Boolean)
  updateMyUser() {}

  @Mutation(() => Boolean)
  deleteMyUser() {}

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => UserPrivate)
  findMyUser() {}

  @Query(() => UserPublic)
  findUser() {}

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}
