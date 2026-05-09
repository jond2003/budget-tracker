import { ObjectId } from "mongodb";

export interface Income {
  _id?: ObjectId;
  user_id: ObjectId;
  label: string;
  category: string;
  amount: number;
  recurring_id?: ObjectId;
  payment_date: Date;
}
