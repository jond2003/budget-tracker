import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import db from "../connection";
import { Transaction } from "../../models/transaction";

const collection = db.collection<Transaction>(Collections.TRANSACTIONS);

export namespace TransactionsCollection {
  // Create a transaction document
  export const createTransaction = async (newTransaction: Transaction): Promise<ObjectId> => {
    return (await collection.insertOne(newTransaction as any)).insertedId;
  }

  // Get single transaction by unique ID
  export const getTransactionById = async (_id: ObjectId): Promise<Transaction | null> => {
    return await collection.findOne({ _id });
  }

  // Get all transactions created by the same user using their user ID
  export const getTransactionsByUserId = async (user_id: ObjectId): Promise<Transaction[]> => {
    return await collection.find({ user_id }).toArray();
  }
  
  // Get all the user's transactions from the given month
  export const getTransactionsByMonth = async (user_id: ObjectId, date: Date): Promise<Transaction[]> => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return await collection.find({
      user_id,
      payment_date: { $gte: startOfMonth, $lt: startOfNextMonth }
    }).toArray();
  }

  // Delete a transaction given the ID
  export const deleteTransaction = async (_id: ObjectId): Promise<Transaction | null> => {
    return await collection.findOneAndDelete({ _id });
  }
}
