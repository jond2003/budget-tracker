import { ObjectId } from "mongodb";

export interface Budget {
  _id?: ObjectId;
  user_id: ObjectId;
  category_id?: ObjectId | string | null;
  start_date: Date;
  end_date?: Date | null;
  amount: number;
}