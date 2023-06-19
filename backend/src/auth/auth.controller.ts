import { Controller, Request, UseGuards, Get, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guards/google-auth.guard'
import { DiscordOAuthGuard } from './guards/discord-auth.guard'

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

  @Get(`discord`)
  @UseGuards(DiscordOAuthGuard)
  discordAuth(@Request() req) {}

  @Get(`discord-redirect`)
  @UseGuards(DiscordOAuthGuard)
  discordAuthRedirect(@Request() req, @Res() res) {
    res.redirect(`${process.env.FRONTEND_URL}`)
    return req.red
  }
}
