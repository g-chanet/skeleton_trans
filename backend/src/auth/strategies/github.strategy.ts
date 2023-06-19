import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-github2'
import { VerifyCallback } from 'passport-github'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, `github`) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/github-redirect`,
      scope: [`read:user`, `read:email`, `user:email`],
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
    const profilejson = profile._json
    const userData = {
      provider: `Github`,
      providerUserId: String(profilejson.id),
      mail: await this.getGithubUserMail(profile.emails),
      username: profilejson.login,
      avatar: profilejson.avatar_url, //dont work
      locale: `fr`,
    }
    return done(null, await this.authService.transOauthLogin(userData))
  }

  getGithubUserMail(emails) {
    if (emails[0].value) {
      return emails[0].value
    } else throw new UnauthorizedException(`can't get github mail`)
  }
}
