import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  firstname: string;
  lastname: string;
  password_hash?: string;
  salt?: string;
  sid: string;
  created_at: Date;
}

export type UserDetails = Pick<User, 'email' | 'firstname' | 'lastname'>;

export const users: Pick<User, '_id' | 'firstname' | 'lastname'>[] = [];
