import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import { User } from "../../models/user";
import { genSalt, hashPassword } from "../../utils/security.utils";
import { db } from "../connection";

const collection = db.collection<User>(Collections.USERS);

export namespace UsersCollection {
  // Get all session IDs in use
  const getSIDs = async (): Promise<string[]> => {
    return await collection.distinct('sid');
  }

  // Checks if a given session id is already in use by another 
  export const isUniqueSID = async (sid: string): Promise<boolean> => {
    return !(await getSIDs()).includes(sid);
  }

  // Create a new user
  export const createUser = async (newUser: User): Promise<ObjectId> => {
    return (await collection.insertOne(newUser as any)).insertedId;
  }

  // Get a user by their session id
  export const getUserById = async (_id: ObjectId): Promise<User | null> => {
    return await collection.findOne({ _id });
  }

  export const isEmailRegistered = async (email: string): Promise<boolean> => {
    const cursor = collection.find({ email }).limit(1);
    return await cursor.hasNext();
  }

  const getSaltByEmail = async (email: string): Promise<User | null> => {
    return await collection.findOne({ email }, { projection: { salt: 1 } });
  }

  export const getUserIdByEmail = async (email: string): Promise<ObjectId | undefined> => {
    return (await collection.findOne({ email }, { projection: { _id: 1 } }))?._id;
  }

  export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await collection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          email: 1,
          firstname: 1,
          lastname: 1
        }
      }
    );
  }

  export const checkPassword = async (email: string, password: string): Promise<ObjectId | undefined> => {
    const salt: string | undefined = (await getSaltByEmail(email))?.salt;
    return (await collection.findOne({ password_hash: hashPassword(password, salt!) }))?._id;
  }
  
  export const updateUser = async (_id: ObjectId, fieldsToUpdate: Partial<User>) => {
    return await collection.findOneAndUpdate(
      { _id },
      { $set: fieldsToUpdate },
      { returnDocument: 'after' }
    );
  }
}
