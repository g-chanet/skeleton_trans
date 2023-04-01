import { GqlAuthGuard } from './../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserPublic, User } from './entities/user.entity';
import * as DTO from './dto/user.input';
import { CtxUser } from 'src/auth/decorators/ctx-user.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  @Mutation(() => Boolean)
  updateMyUser(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.UpdateMyUserInput,
  ) {
    return this.usersService.update(user.id, args);
  }

  @Mutation(() => Boolean)
  deleteMyUser(@CtxUser() user: User) {
    return this.usersService.delete(user.id);
  }

  //**************************************************//
  //  QUERY
  //**************************************************//

  @Query(() => User)
  findMyUser(@CtxUser() user: User) {
    return user;
  }

  @Query(() => UserPublic)
  findUser(@Args(`args`) args: DTO.FindUserInput) {
    return this.usersService.findOne(args.id);
  }

  //**************************************************//
  //  SUBSCRIPTION
  //**************************************************//
}