import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { AuthService } from '../auth.service';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, `google`) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google/callback`,
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    return;
  }
}
