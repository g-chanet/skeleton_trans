import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { VerifyCallback } from 'passport-discord-oauth2'
import { UsersService } from 'src/users/users.service'
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly authService: AuthService,
    private prisma: PrismaService
    ) {
    super({
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/discord-redirect',
      scope: ['identify', 'email'],
      passReqToCallback: true,
    });
  }

  async validate(
    req,
    accessToken: string,
    refreshToken: string,
    profile: any,
    email: string,
    done: VerifyCallback,
  ) {
    console.log(profile, accessToken)
  }
}
