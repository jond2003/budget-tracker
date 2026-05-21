import { Request, Response, NextFunction } from "express";
import { LoginErrors, RegisterErrors, Validation } from "../utils/validation.utils";
import { UsersCollection } from "../database/methods/users.methods";
import { User, users } from "../models/user";
import { genSalt, hashPassword } from "../utils/security.utils";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.userId) return res.send({ message: 'Already logged in' }).status(403);

    const { email, password } = req.body;

    const validationErrors: LoginErrors = {
      ...await Validation.isLoginValid(email, password),
    };

    for (let err in validationErrors) {
      res.send({ errors: validationErrors }).status(400);
      return;
    }

    const user = await UsersCollection.getUserByEmail(email);

    if (!user) {
      res.send("Not found").status(404);
      return;
    }

    req.session.userId = user._id!.toString();
    users.push({ ...user });
    res.send({ user_id: user._id, ok: true }).status(200);
  } catch (error) {
    next(error);
  }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const validationErrors: RegisterErrors = {
      ...await Validation.isEmailValid(email),
      ...Validation.isPasswordValid(password)
    };

    for (let err in validationErrors) {
      res.send({ errors: validationErrors }).status(400);
      return;
    }

    const salt = genSalt();
    const newUser: User = {
      email,
      firstname,
      lastname,
      salt: salt,
      password_hash: hashPassword(password, salt),
      sid: '',
      created_at: new Date()
    }
    const userId = await UsersCollection.createUser(newUser);

    res.send({ user_id: userId, ok: true }).status(201);
  } catch (error) {
    next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.send({ message: 'Logged out' });
    });
  } catch (err) {
    next(err);
  }
}
