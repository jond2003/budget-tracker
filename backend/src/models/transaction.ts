import { ObjectId } from "mongodb";

export interface Transaction {
  _id?: ObjectId;
  user_id: ObjectId;
  label: string;
  category_id: ObjectId | string;
  amount: number;
  recurring_id?: ObjectId;
  payment_date: Date;
}
