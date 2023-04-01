import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtDto } from '../dto/jwt.dto';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, `jwt`) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
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
