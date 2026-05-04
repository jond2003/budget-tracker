import { ALPHANUMERIC_REGEX, EMAIL_REGEX, PASSWORD_MIN_LENGTH, SYMBOL_REGEX } from "../constants/validation.constants";
import { UsersCollection } from "../database/methods/users.methods"

export enum LoginValidationErrors {
  EMAIL_UNREGISTERED = 'An account with this email does not exist',
  WRONG_PASSWORD = 'Password does not match the given email'
}

export enum RegisterValidationErrors {
  EMAIL_EXISTS = 'An account with this email already exists',
  NOT_EMAIL = 'Email must be in the correct format, e.g. john@example.com',
  PASSWORD_TOO_SHORT = 'Password must be at least 8 characters long',
  PASSWORD_NOT_ALPHANUM = 'Password must contain both letters and numbers',
  PASSWORD_NO_SYMBOL = 'Password must contain at least 1 symbol, e.g. !"£$%^&*()'
}

// export interface LoginErrors {
//   emailUnregistered?: LoginValidationErrors.EMAIL_UNREGISTERED;
//   emailBadFormat?: RegisterValidationErrors.NOT_EMAIL;
//   password_wrong?: LoginValidationErrors.WRONG_PASSWORD;
// }

// export interface RegisterErrors {
//   emailExists?: RegisterValidationErrors.EMAIL_EXISTS;
//   emailBadFormat?: RegisterValidationErrors.NOT_EMAIL;
//   passwordTooShort?: RegisterValidationErrors.PASSWORD_TOO_SHORT;
//   passwordNoVariation?: RegisterValidationErrors.PASSWORD_NOT_ALPHANUM;
//   passwordNoSymbol?: RegisterValidationErrors.PASSWORD_NO_SYMBOL;
// }

export interface LoginErrors {
  emailUnregistered?: boolean;
  emailBadFormat?: boolean;
  passwordWrong?: boolean;
}

export interface RegisterErrors {
  emailExists?: boolean;
  emailBadFormat?: boolean;
  passwordTooShort?: boolean;
  passwordNoVariation?: boolean;
  passwordNoSymbol?: boolean;
}

export namespace Validation {
  // Register Email Validation
  const isEmailRegistered = async (e: string): Promise<boolean> => await UsersCollection.isEmailRegistered(e);
  const isEmail = (e: string): boolean => EMAIL_REGEX.test(e);

  export const isEmailValid = async (e: string): Promise<RegisterErrors> => {
    const errors: RegisterErrors = {};
    if (await isEmailRegistered(e)) errors.emailExists = true;
    if (!isEmail(e)) errors.emailBadFormat = true;
    return errors;
  }

  // Register Password Validation
  const isPasswordLong = (pw: string): boolean => pw.length >= PASSWORD_MIN_LENGTH;
  const isPasswordAlphaNum = (pw: string): boolean => ALPHANUMERIC_REGEX.test(pw);
  const passwordHasSymbol = (pw: string): boolean => SYMBOL_REGEX.test(pw);

  export const isPasswordValid = (pw: string): RegisterErrors => {
    const errors: RegisterErrors = {};
    if (!isPasswordLong(pw)) errors.passwordTooShort = true;
    if (!isPasswordAlphaNum(pw)) errors.passwordNoVariation = true;
    if (!passwordHasSymbol(pw)) errors.passwordNoSymbol = true;
    return errors;
  }

  // Login Validation
  const emailMatchesPassword = async (e: string, pw: string): Promise<boolean> => {
    return !!(await UsersCollection.checkPassword(e, pw));
  }

  export const isLoginValid = async (e: string, pw: string) => {
    const errors: LoginErrors = {};
    if (!isEmail(e)) errors.emailBadFormat = true;
    else if (!(await isEmailRegistered(e))) errors.emailUnregistered = true;
    else if (!(await emailMatchesPassword(e, pw))) errors.passwordWrong = true;
    return errors;
  }
}
