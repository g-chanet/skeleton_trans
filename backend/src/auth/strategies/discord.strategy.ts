import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-discord-oauth2'
import { AuthService } from '../auth.service'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, `discord`) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/discord-redirect`,
      scope: [`identify`, `email`],
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
      provider: `Discord`,
      providerUserId: profile.id,
      mail: profile.email,
      username: profile.username,
      avatar: profile.avatar,
      locale: profile.locale,
    }
    return done(null, await this.authService.transOauthLogin(userData))
  }
}
