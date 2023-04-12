import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-github2'

const STEAM_CLIENT_ID = process.env.STEAM_CLIENT_ID
const STEAM_CLIENT_SECRET = process.env.STEAM_CLIENT_SECRET

const scopes = []

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy, `steam`) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: STEAM_CLIENT_ID,
      clientSecret: STEAM_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/steam/return`,
      scope: scopes,
    })
  }

  function(identifier, profile, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user)
    })
  }
}
