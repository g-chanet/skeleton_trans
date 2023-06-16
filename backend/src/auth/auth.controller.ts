import { Controller, Request, UseGuards, Get, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guards/google-auth.guard'
import { LoggedInGuard } from './guards/logged-in.guard'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(`google`)
  @UseGuards(GoogleOAuthGuard)
  googleAuth(@Request() req) {
    return { msg: `Google Auth` }
  }

  @Get(`google-redirect`)
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`)
    return req.red
  }

  @Get(`status`)
  status(@Req() req) {
    if (req.user) {
      return { msg: `Authenticated` }
    } else {
      return { msg: `Not Authenticated` }
    }
  }

  @Get(`logout`)
  @UseGuards(LoggedInGuard)
  logout(@Request() req, @Res() res) {
    req.session.destroy()
    res.clearCookie(`connect.sid`)
    return { msg: `logout` }
  }
}
