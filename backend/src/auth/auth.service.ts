import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { AuthHelper } from './auth.helper'
import * as DTO from './dto/auth.input'
import { GoogleAuthDto } from './dto/google.auth.dto'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //**************************************************//
  //  MUTATION
  //**************************************************//

  async signInLocal({
    emailOrUsername,
    password,
  }: DTO.SignInLocalInput): Promise<User> {
    const user =
      (await this.usersService.findOneByEmail(emailOrUsername)) ||
      (await this.usersService.findOneByUsername(emailOrUsername))

    if (user === null) {
      throw new UnauthorizedException(`Invalid credentials`)
    }
    if ((await AuthHelper.validate(password, user.password)) === false) {
      throw new UnauthorizedException(`Invalid password`)
    }

    delete user.password
    return user
  }

  async signUpLocal({
    username,
    email,
    password,
  }: DTO.SignUpLocalInput): Promise<User> {
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
    delete user.password
    return user
  }

  async validateUser(emailOrUsername: string, password: string) {
    const user =
      (await this.usersService.findOneByEmail(emailOrUsername)) ||
      (await this.usersService.findOneByUsername(emailOrUsername))

    if (user === null) {
      throw new UnauthorizedException(`Invalid credentials`)
    }
    if ((await AuthHelper.validate(password, user.password)) === false) {
      throw new UnauthorizedException(`Invalid password`)
    }

    delete user.password
    return user
  }

  async validateUserId(userId: string) {
    return await this.usersService.findOne(userId)
  }

  async googleLogin(payload: GoogleAuthDto) {
    if (!payload)
      throw new BadRequestException(`Cannot get user info from google`)
    let dbUser = await this.usersService.findOneByEmail(payload.mail)
    // We enter login flow
    if (dbUser) {
      if (!dbUser.googleId) {
        throw new UnauthorizedException(
          `User is knowed but did not signed up with Google`,
        )
      }
    } else if (!dbUser) {
      // We enter signin flow
      const username = await this.findAvailableUsername(payload.username)
      // lots of possible fields to add, need to change User class
      dbUser = await this.usersService.create({
        username: username,
        email: payload.mail,
        avatarUrl: payload.picture,
        googleId: payload.mail,
      })
    }
    if (!dbUser) {
      throw new BadRequestException(`lé où l'user ?`)
    }
    return dbUser
  }
  //**************************************************//
  //  UTILS
  //**************************************************//

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
