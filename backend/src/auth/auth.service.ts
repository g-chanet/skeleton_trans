import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { UsersService } from 'src/users/users.service';
import { AuthHelper } from './auth.helper';
import * as DTO from './dto/auth.input';
import { JwtDto } from './dto/jwt.dto';
import { UserToken } from './entities/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async signInLocal({
    emailOrUsername,
    password,
  }: DTO.SignInLocalInput): Promise<UserToken> {
    const user =
      (await this.usersService.findOneByEmail(emailOrUsername)) ||
      (await this.usersService.findOneByUsername(emailOrUsername));

    if (user === null) {
      throw new UnauthorizedException(`Invalid credentials`);
    }
    if ((await AuthHelper.validate(password, user.password)) === false) {
      throw new UnauthorizedException(`Invalid password`);
    }

    return { user, token: this.signToken(user.id) };
  }

  async signUpLocal({
    username,
    email,
    password,
  }: DTO.SignUpLocalInput): Promise<UserToken> {
    if (await this.usersService.findOneByUsername(username)) {
      throw new BadRequestException(`Cannot register with '${username}'`);
    }
    if (await this.usersService.findOneByEmail(email)) {
      throw new BadRequestException(`Cannot register with '${email}'`);
    }

    const user = await this.usersService.create({
      username,
      password: await AuthHelper.hash(password),
      email,
    });

    return { user, token: this.signToken(user.id) };
  }

  async validateUser(userId: string) {
    console.log(`validateUser`);
    return await this.usersService.findOne(userId);
  }

  //**************************************************//
  //  UTILS
  //**************************************************//

  private signToken(userId: string) {
    const payload: JwtDto = { userId };
    return this.jwtService.sign(payload);
  }
}
