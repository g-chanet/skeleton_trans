import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-github2'
import { UsersService } from 'src/users/users.service'
import { customAlphabet } from 'nanoid'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const nanoid = customAlphabet(
  `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`,
  15,
)

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://127.0.0.1:3000/auth/github/callback`,
    })
  }
  async function(accessToken, refreshToken, profile, done) {
    const user = await this.userService.findOneByEmail(profile.email)

    if (user === undefined) {
      return await this.userService.create({
        email: profile.email,
        username: nanoid(),
      })
    }

    if (user.githubId === profile.githubId) return user
    else {
      throw Error()
    }
  }
}
