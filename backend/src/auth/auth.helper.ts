import { compare, hash } from 'bcrypt';

const SALT_OR_ROUNDS = 10;
const PASS_MIN_LENGTH = /^.{8,}$/;
const PASS_MAX_LENGTH = /^.{0,256}$/;
const PASS_HAVE_UPPER = /(?=.*[A-Z])/;
const PASS_HAVE_LOWER = /(?=.*[a-z])/;
const PASS_HAVE_DIGIT = /(?=.*\d)/;
const PASS_HAVE_SPECIAL_CHAR = /(?=.*[@$:;!%*#?&])/;

export class AuthHelper {
  static validate(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  static hash(password: string) {
    this.verifyPassword(password);
    return hash(password, SALT_OR_ROUNDS);
  }

  static verifyPassword(password: string) {
    if (password === ``) {
      throw new Error(`Mot de passe non définit`);
    }
    if (!PASS_MIN_LENGTH.test(password)) {
      throw new Error(`Le mot de passe fait au moins 8 caractères de long.`);
    }
    if (!PASS_MAX_LENGTH.test(password)) {
      throw new Error(`Le mot de passe ne doit pas dépasser 256 caractères.`);
    }
    if (!PASS_HAVE_UPPER.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins une majuscule.`);
    }
    if (!PASS_HAVE_LOWER.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins une minuscule.`);
    }
    if (!PASS_HAVE_DIGIT.test(password)) {
      throw new Error(`Le mot de passe doit contenir au moins un nombre.`);
    }
  }
}
