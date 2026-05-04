import { ObjectId } from "mongodb";
import { Recurring } from "./recurring";

export interface Expense {
  _id?: ObjectId;
  user_id: ObjectId;
  category_id: ObjectId;
  amount: number;
  recurring?: Recurring;
  payment_date: Date;
}
