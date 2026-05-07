import { ObjectId } from "mongodb";
import { Category } from "./category";

export interface Income {
  _id?: ObjectId;
  user_id: ObjectId;
  category_id: Category;
  amount: number;
  recurring_id?: ObjectId;
  payment_date: Date;
}
