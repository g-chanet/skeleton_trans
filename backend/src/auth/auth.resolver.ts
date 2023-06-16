import { GqlAuthGuard } from './guards/gql-auth.guard'
import { UseGuards, Req } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import * as DTO from './dto/auth.input'
import { LocalGuard } from './guards/local-auth.guard'
import { User } from 'src/users/entities/user.entity'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //**************************************************//
  //  MUTATION - AUTH LOCAL
  //**************************************************//

  // EMAIL + PASSWORD
  @Mutation(() => User)
  @UseGuards(LocalGuard)
  signInLocal(@Args(`args`) args: DTO.SignInLocalInput) {
    return this.authService.signInLocal(args)
  }

  @Mutation(() => User)
  signUpLocal(@Args(`args`) args: DTO.SignUpLocalInput) {
    return this.authService.signUpLocal(args)
  }

  //**************************************************//
  //  MUTATION - OAUTH
  //**************************************************//

  // GOOGLE ACCOUNT
  @Mutation(() => Boolean)
  signInGoogle() {
    return true
  }

  // GITHUB ACCOUNT
  @Mutation(() => Boolean)
  signInGithub() {
    return true
  }

  // 42 ACCOUNT
  @Mutation(() => Boolean)
  signIn42() {
    return true
  }

  // DISCORD ACCOUNT
  @Mutation(() => Boolean)
  signInDiscord() {
    return true
  }

  //**************************************************//
  //  MUTATION - COMMON
  //**************************************************//

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  logout(@Req() req) {
    req.logout()
    return true
  }
}
