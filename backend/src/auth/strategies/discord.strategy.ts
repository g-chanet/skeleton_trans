import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-discord'
import { AuthService } from '../auth.service'
import { PrismaService } from 'src/prisma/prisma.service'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, `discord`) {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService,
  ) {
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
    const userData = {
      provider: profile.provider,
      mail: profile.email,
      username: profile.username,
      global_name: profile.global_name,
      discriminator: profile.discriminator,
      avatar: profile.avatar,
      locale: profile.locale,
      authType: `oauth`,
    }
    return done(null, await this.authService.discordLogin(userData))
  }
}
