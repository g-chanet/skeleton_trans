import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthHelper } from './auth.helper';
import * as DTO from './dto/auth.input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async signInLocal({ emailOrUsername, password }: DTO.signInLocalInput) {
    const user =
      (await this.usersService.findOneByEmail(emailOrUsername)) ||
      (await this.usersService.findOneByUsername(emailOrUsername));
    if (user === null || AuthHelper.validate(password, user.password)) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    return user;
  }

  async signUpLocal({ username, email, password }: DTO.SignUpLocalInput) {
    if (await this.usersService.findOneByUsername(username)) {
      throw new BadRequestException(`Cannot register with '${username}'`);
    }
    if (await this.usersService.findOneByEmail(email)) {
      throw new BadRequestException(`Cannot register with '${email}'`);
    }
    return await this.usersService.create({
      username,
      password: await AuthHelper.hash(password),
      email,
    });
  }
}
