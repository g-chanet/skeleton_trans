import { Controller, Request, UseGuards, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guards/google-auth.guard'
import { DiscordOAuthGuard } from './guards/discord-auth.guard'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get(`google`)
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) { }

  @Get(`google-redirect`)
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) { }

  @Get(`discord`)
  @UseGuards(DiscordOAuthGuard)
  async discordAuth(@Request() req) { }

  @Get(`discord-redirect`)
  @UseGuards(DiscordOAuthGuard)
  discordAuthRedirect(@Request() req) { }
}
