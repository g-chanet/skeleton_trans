import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import * as DTO from './dto/auth.input';
import { UserToken } from './entities/user-token';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //**************************************************//
  //  MUTATION - AUTH LOCAL
  //**************************************************//

  // EMAIL + PASSWORD
  @Mutation(() => UserToken)
  signInLocal(@Args(`args`) args: DTO.signInLocalInput) {
    return this.authService.signInLocal(args);
  }

  @Mutation(() => UserToken)
  signUpLocal(@Args(`args`) args: DTO.SignUpLocalInput) {
    return this.authService.signUpLocal(args);
  }

  //**************************************************//
  //  MUTATION - OAUTH
  //**************************************************//

  // GOOGLE ACCOUNT
  @Mutation(() => Boolean)
  signInGoogle() {
    return true;
  }

  // GITHUB ACCOUNT
  @Mutation(() => Boolean)
  signInGithub() {
    return true;
  }

  // 42 ACCOUNT
  @Mutation(() => Boolean)
  signIn42() {
    return true;
  }

  // DISCORD ACCOUNT
  @Mutation(() => Boolean)
  signInDiscord() {
    return true;
  }

  //**************************************************//
  //  MUTATION - COMMON
  //**************************************************//

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  logout() {
    return true;
  }
}
