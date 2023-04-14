import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import { UsersService } from 'src/users/users.service'
import { AuthHelper } from './auth.helper'
import * as DTO from './dto/auth.input'
import { JwtDto } from './dto/jwt.dto'
import { UserToken } from './entities/user-token'

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
      (await this.usersService.findOneByUsername(emailOrUsername))

    if (user === null) {
      throw new UnauthorizedException(`Invalid credentials`)
    }
    if ((await AuthHelper.validate(password, user.password)) === false) {
      throw new UnauthorizedException(`Invalid password`)
    }

    return { user, token: this.signToken(user.id) }
  }

  async signUpLocal({
    username,
    email,
    password,
  }: DTO.SignUpLocalInput): Promise<UserToken> {
    if (await this.usersService.findOneByUsername(username)) {
      throw new BadRequestException(`Cannot register with '${username}'`)
    }
    if (await this.usersService.findOneByEmail(email)) {
      throw new BadRequestException(`Cannot register with '${email}'`)
    }

    const user = await this.usersService.create({
      username,
      password: await AuthHelper.hash(password),
      email,
    })

    user.

    return { user, token: this.signToken(user.id) }
  }

  async validateUser(userId: string) {
    return await this.usersService.findOne(userId)
  }

  async googleLogin(req) {
    if (!req._user)
      throw new BadRequestException(`Cannot get user info from google`)
    let dbUser = await this.usersService.findOneByEmail(req._user.mail)
    // We enter login flow
    if (dbUser) {
      if (!dbUser.googleId) {
        throw new UnauthorizedException(
          `User is knowed but did not signed up with Google`,
        )
      }
    } else if (!dbUser) {
      // We enter signin flow
      const username = await this.findAvailableUsername(req._user.username)
      // lots of possible fields to add, need to change User class
      dbUser = await this.usersService.create({
        username: username,
        email: req._user.mail,
        avatarUrl: req._user.picture,
        googleId: req._user.mail,
      })
    }
    if (!dbUser) {
      throw new BadRequestException(`lé où l'user ?`)
    }
    return { dbUser, token: this.signToken(dbUser.id) }
  }
  //**************************************************//
  //  UTILS
  //**************************************************//

  private signToken(userId: string) {
    const payload: JwtDto = { userId }
    return this.jwtService.sign(payload)
  }

  private async findAvailableUsername(baseUserName: string) {
    let localUserName = baseUserName

    if (await this.usersService.findOneByUsername(baseUserName)) {
      let counter = 1
      while (await this.usersService.findOneByUsername(localUserName)) {
        localUserName = baseUserName + counter
        counter++
      }
    }

    return localUserName
  }
}
