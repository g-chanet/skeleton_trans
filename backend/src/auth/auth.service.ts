import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as DTO from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async signInLocal(args: DTO.signInLocalInput) {
    return true;
  }

  async signUpLocal(args: DTO.SignUpLocalInput) {
    return true;
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user || user.password !== password)
      throw new UnauthorizedException(`Invalid credentials`);

    return user;
  }
}
