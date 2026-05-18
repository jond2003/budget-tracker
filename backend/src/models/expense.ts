import { ObjectId } from "mongodb";

export interface Expense {
  _id?: ObjectId;
  user_id: ObjectId;
  category_id: ObjectId;
  amount: number;
  recurring_id?: ObjectId;
  payment_date: Date;
}
