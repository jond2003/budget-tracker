import { ObjectId } from "mongodb";
import { Recurring } from "./recurring";
import { Category } from "./category";

export interface Income {
  _id?: ObjectId;
  user_id: ObjectId;
  category_id: Category;
  amount: number;
  recurring?: Recurring;
  payment_date: Date;
}
