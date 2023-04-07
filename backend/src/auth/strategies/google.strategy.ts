import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth2'
import { UsersService } from 'src/users/users.service'
import { AuthService } from '../auth.service'
import { PrismaService } from 'src/prisma/prisma.service' 

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
let usersService = UsersService;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, `google`) {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private prisma: PrismaService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3000/auth/google-redirect`,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    })
  }

 async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    }

    if (await this.usersService.findOneByEmail(user.email))
      throw new UnauthorizedException();
    
    const username = await this.findAvailableUsername(user.firstName);
    //add firstname, lastname in UserCreateInput
    const dbUser = this.usersService.create({ 
      username: username,
      email:user.email,
      avatarUrl: user.picture
    })
    if (!dbUser)
      throw new UnauthorizedException();
    done(null, user)
  }

  async findAvailableUsername(baseUserName: string)
  {
    let localUserName = baseUserName;

    if (await this.usersService.findOneByUsername(baseUserName))
    {
      let counter = 1;
      while (await this.usersService.findOneByUsername(localUserName))
      {
        localUserName = baseUserName + counter;
        counter++;
      }
    }

    return localUserName;
  }
}

// check if an user have a given google id / mail / username via serviceUser method
// if no create a new user else return token
