import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy, VerifyCallback } from 'passport-42'

const SCHOOL42_CLIENT_ID = process.env.SCHOOL42_CLIENT_ID
const SCHOOL42_CLIENT_SECRET = process.env.SCHOOL42_CLIENT_SECRET

@Injectable()
export class School42Strategy extends PassportStrategy(Strategy, `42`) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        clientID: SCHOOL42_CLIENT_ID,
        clientSecret: SCHOOL42_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:3000/auth/42-redirect`,
        scope: [],
        passReqToCallback: true,
      },
      function (
        req,
        accessToken,
        refreshToken,
        profile: any,
        done: VerifyCallback,
      ) {
        console.log(profile)
      },
    )
  }
}
