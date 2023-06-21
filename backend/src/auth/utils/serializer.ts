import { PassportSerializer } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(`AUTH_SERVICE`) private readonly authService: AuthService,
  ) {
    super()
  }

  serializeUser(user: any, done: Function) {
    done(null, user)
  }

  async deserializeUser(payload: any, done: Function) {
    console.log(`before user creation, payload : `, payload)
    const user = await this.authService.validateUserId(payload.id)
    console.log(`after user creation`)
    return done(null, user ?? null)
  }
}
