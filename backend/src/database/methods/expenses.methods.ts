import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import { Expense } from "../../models/expense";
import { db } from "../connection";

const collection = db.collection<Expense>(Collections.TRANSACTIONS);

export namespace ExpensesCollection {
  // Create an expense document
  export const createExpense = async (newExpense: Expense): Promise<ObjectId> => {
    return (await collection.insertOne(newExpense as any)).insertedId;
  }

  // Get single expense by unique ID
  export const getExpenseById = async (_id: ObjectId): Promise<Expense | null> => {
    return await collection.findOne({ _id });
  }

  // Get all expenses created by the same user using their user ID
  export const getExpensesByUserId = async (user_id: ObjectId): Promise<Expense[]> => {
    return await collection.find({ user_id }).toArray();
  }
}
