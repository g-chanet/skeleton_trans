import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `YellowSubmarineKey`,
    });
  }

  async validate(payload: JwtDto) {
    const user = await this.authService.validateUser(payload.userId);

    if (user === null) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
