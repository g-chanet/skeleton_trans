import { GqlAuthGuard } from './guards/gql-auth.guard'
import { LocalGuard } from './guards/local-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { UsersService } from 'src/users/users.service'
import * as DTO from './dto/auth.input'
import { User } from 'src/users/entities/user.entity'
import { CtxSession } from './decorators/ctx-session.decorator'
import { CtxUser } from './decorators/ctx-user.decorator'

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  //**************************************************//
  //  MUTATION - AUTH LOCAL
  //**************************************************//

  // EMAIL + PASSWORD + 2fasecret
  @Mutation(() => User)
  signInLocal(@Args(`args`) args: DTO.SignInLocalInput) {
    return this.authService.signInLocal(args)
  }

  @Mutation(() => User)
  signUpLocal(@Args(`args`) args: DTO.SignUpLocalInput) {
    return this.authService.signUpLocal(args)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isGoogleAuthCodeValid(
    @CtxUser() user: User,
    @Args(`args`) args: DTO.GoogleAuthCodeValidatorInput,
  ) {
    const dbUser = await this.userService.findOne(user.id)
    return this.authService.isTwoFactorAuthenticationCodeValid(
      args.code,
      dbUser,
    )
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
  logout(@CtxSession() session) {
    session.destroy()
    return true
  }
}
