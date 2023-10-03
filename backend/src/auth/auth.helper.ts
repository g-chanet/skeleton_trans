import { BadRequestException } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

const SALT_OR_ROUNDS = 10

const MIN_LENGTH = /^.{8,}$/
const MAX_LENGTH = /^.{0,256}$/
const HAVE_UPPER = /(?=.*[A-Z]*)/
const HAVE_LOWER = /(?=.*[a-z]*)/
const HAVE_DIGIT = /(?=.*\d*)/
const HAVE_SPECIAL_CHAR = /(?=.*[@$:;!%*#?&])/

export class AuthHelper {
  static async validate(password: string, hash: string) {
    return await compare(password, hash)
  }

  static async hash(password: string) {
    this.verifyPassword(password)
    return await hash(password, await genSalt(SALT_OR_ROUNDS))
  }

  static verifyPassword(password: string) {
    if (password === ``) {
      throw new Error(`Password is undefined`)
    }
    if (!MIN_LENGTH.test(password)) {
      throw new BadRequestException(
        `Password needs to be atleast 8 characters long`,
      )
    }
    if (!MAX_LENGTH.test(password)) {
      throw new BadRequestException(`Password cannot exceed 256 characters`)
    }
    if (HAVE_UPPER.test(password)) {
      throw new BadRequestException(
        `Password must contain at least one uppercase character`,
      )
      console.log(`haveUpper`)
    }
    if (HAVE_LOWER.test(password)) {
      throw new BadRequestException(
        `Password must contain at least one lowercase character`,
      )
    }
    if (HAVE_DIGIT.test(password)) {
      throw new BadRequestException(`Password must contain at least one number`)
    }
  }
}
