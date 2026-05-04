import { createHash, randomBytes, randomUUID } from 'crypto';
import { UsersCollection } from '../database/methods/users.methods';

export const genUUID = (): string => {
  let id = randomUUID();
  while (!UsersCollection.isUniqueSID(id)) {
    id = randomUUID();
  }
  return id;
}

export const genSecret = (): string => {
  return randomBytes(32).toString('hex');
}

export const hash = (data: string): string => {
  return createHash('sha256').update(data).digest('hex');
}

export const hashPassword = (password: string, salt: string): string => {
  const saltBefore = Number.isNaN(salt[0]) ? true : false;
  const data = saltBefore ? salt + password : password + salt;
  return hash(data);
}

export const genSalt = (): string => {
  return randomBytes(16).toString('hex');
}
