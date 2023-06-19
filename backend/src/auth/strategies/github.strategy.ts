import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy, VerifyCallback } from 'passport-github'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, `github`) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:3000/auth/github-redirect`,
        scope: [`read:user`, `read:email`],
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
    console.log(profile)
    const userData = {
      provider: `Github`,
      providerUserId: profile.id,
      mail: profile.email,
      username: profile.login,
      avatar: profile.avatar_url, //dont work
      locale: `fr`,
    }
    return done(null, await this.authService.transOauthLogin(userData))
  }
}
