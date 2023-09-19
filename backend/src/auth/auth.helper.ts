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
      throw new Error(`Mot de passe non défini`)
    }
    if (!MIN_LENGTH.test(password)) {
      throw new Error(`Le mot de passe fait moins 8 caractères.`)
    }
    if (!MAX_LENGTH.test(password)) {
      throw new Error(`Le mot de passe ne doit pas dépasser 256 caractères.`)
    }
    if (!HAVE_UPPER.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins une majuscule.`)
    }
    if (!HAVE_LOWER.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins une minuscule.`)
    }
    if (!HAVE_DIGIT.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins un nombre.`)
    }
  }
}
