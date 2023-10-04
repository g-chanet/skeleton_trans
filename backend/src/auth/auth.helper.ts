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
    const MIN_LENGTH = /^.{8,}$/.test(password)
    const MAX_LENGTH = /^.{0,16}$/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasDigit = /[0-9]/.test(password)
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(password)
    if (password === ``) {
      throw new Error(`Password is empty.`)
    } else if (!MIN_LENGTH) {
      throw new BadRequestException(
        `Password needs to be atleast 8 characters long`,
      )
    } else if (!MAX_LENGTH) {
      throw new BadRequestException(`Password cannot exceed 16 characters.`)
    } else if (!hasUppercase) {
      throw new BadRequestException(
        `Password must contain at least one uppercase character.`,
      )
    } else if (!hasLowercase) {
      throw new BadRequestException(
        `Password must contain at least one lowercase character.`,
      )
    } else if (!hasDigit) {
      throw new BadRequestException(`Password must contain at least one digit`)
    } else if (hasSpecialChars) {
      throw new BadRequestException(
        `Password must contain no special characters.`,
      )
    }
  }
}
