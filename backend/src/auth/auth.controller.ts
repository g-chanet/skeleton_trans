import { Controller, Request, UseGuards, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './guards/google-auth.guard'

@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(`google`)
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get(`google-redirect`)
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req)
  }
}
