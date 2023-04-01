import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user || user.password !== password)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
