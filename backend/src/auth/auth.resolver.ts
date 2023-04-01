import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as DTO from './dto/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //**************************************************//
  //  MUTATION - AUTH LOCAL
  //**************************************************//

  // EMAIL + PASSWORD
  @Mutation(() => Boolean)
  signInLocal(@Args(`args`) args: DTO.signInLocalInput) {
    return this.authService.signInLocal(args);
  }

  @Mutation(() => Boolean)
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

  @Mutation(() => Boolean)
  logout() {
    return true;
  }
}
