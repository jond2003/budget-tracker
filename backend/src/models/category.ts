import { ObjectId } from "mongodb";

export interface Category {
  _id?: ObjectId;
  user_id: ObjectId;
  name: string;
}