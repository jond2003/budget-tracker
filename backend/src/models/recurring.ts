import { ObjectId } from "mongodb";

export interface RecurringGroup {
  _id: ObjectId;
  name: string;
  start_date: Date;
  end_date?: Date;
  frequency: number;
}
