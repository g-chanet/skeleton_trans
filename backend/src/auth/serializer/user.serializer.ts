import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.username);
  }

  async deserializeUser(username: string, done: Function) {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) {
      return done(
        `Could not deserialize user: user with ${username} could not be found`,
        null,
      );
    }

    done(null, user);
  }
}
