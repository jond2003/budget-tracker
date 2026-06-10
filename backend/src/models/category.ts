import { ObjectId } from "mongodb";

export interface Category {
  _id?: ObjectId;
  user_id: ObjectId;
  name: string;
  colour?: string;
  primary_colour: string;
  secondary_colour: string;
  payment_type: 'income' | 'transaction';
}
