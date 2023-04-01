import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { LoginLocalInput } from './dto/auth.input';

@Resolver()
export class AuthResolver {
  //**************************************************//
  //  MUTATION
  //**************************************************//

  @UseGuards(AuthGuard('local'))
  @Mutation(() => Boolean)
  login(@Args('args') args: LoginLocalInput) {
    return true;
  }

  @Mutation(() => Boolean)
  logout() {
    return true;
  }
}
