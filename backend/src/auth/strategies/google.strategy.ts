import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2'
import { UsersService } from 'src/users/users.service'
import { AuthService } from '../auth.service'
import { PrismaService } from 'src/prisma/prisma.service'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const usersService = UsersService

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, `google`) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google-redirect`,
      scope: [`email`, `profile`],
      passReqToCallback: true,
    })
  }
  async validate(
    req,
    accessToken,
    refreshToken,
    profile: any,
    done: VerifyCallback,
  ) {
    const profileJson = profile._json
    const userData = {
      provider: profileJson.provider,
      mail: profileJson.email,
      username: profileJson.name,
      firstname: profileJson.given_name,
      lastname: profileJson.family_name,
      picture: profileJson.picture,
      locale: profileJson.language,
      authType: `oauth`,
    }
    return done(null, await this.authService.googleLogin(userData))
  }
}
