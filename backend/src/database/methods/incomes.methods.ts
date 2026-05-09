import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import { Income } from "../../models/income";
import db from "../connection";

const collection = db.collection<Income>(Collections.INCOME);

export namespace IncomesCollection {
  // Create an income document
  export const createIncome = async (newIncome: Income): Promise<ObjectId> => {
    return (await collection.insertOne(newIncome as any)).insertedId;
  }

  // Get single income by unique ID
  export const getIncomeById = async (_id: ObjectId): Promise<Income | null> => {
    return await collection.findOne({ _id });
  }

  // Get all incomes created by the same user using their user ID
  export const getIncomesByUserId = async (user_id: ObjectId): Promise<Income[]> => {
    return await collection.find({ user_id }).toArray();
  }

  // Get all the user's incomes from the given month
  export const getIncomesByMonth = async (user_id: ObjectId, date: Date): Promise<Income[]> => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return await collection.find({
      user_id,
      payment_date: { $gte: startOfMonth, $lt: startOfNextMonth }
    }).toArray();
  }

  // Delete a income given the ID
  export const deleteIncome = async (_id: ObjectId): Promise<Income | null> => {
    return await collection.findOneAndDelete({ _id });
  }
}
