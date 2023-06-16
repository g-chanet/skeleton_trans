import { Controller, Request, UseGuards, Get, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guards/google-auth.guard'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(`google`)
  @UseGuards(GoogleOAuthGuard)
  googleAuth(@Request() req) {}

  @Get(`google-redirect`)
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}`)
    return req.red
  }

  @Get(`status`)
  status(@Req() req) {
    if (req.isAuthenticated) {
      return { msg: `Authenticated` }
    } else {
      return { msg: `Not Authenticated` }
    }
  }
}
