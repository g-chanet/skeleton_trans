import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-discord'
import { AuthService } from '../auth.service'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET

const scopes = [`identify`, `email`, `guilds`, `guilds.join`]

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, `discord`) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/discord/callbackURL`,
      scope: scopes,
    })
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): any {
    const { id, username, discriminator, email } = profile
    const user = {
      id,
      username,
      discriminator,
      email,
    }
    done(null, user)
  }
}
