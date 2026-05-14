import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import db from "../connection";
import { Budget } from "../../models/budget";

const collection = db.collection<Budget>(Collections.BUDGETS);

export namespace BudgetsCollection {
  // Create a budget document
  export const createBudget = async (newBudget: Budget): Promise<ObjectId> => {
    return (await collection.insertOne(newBudget as any)).insertedId;
  }

  // Get all budgets by its category id
  export const getBudgetsByCategory = async (user_id: ObjectId, category_id: string): Promise<Budget[]> => {
    return await collection.find({ user_id, category_id }).toArray();
  }

  // Get all budgets for the given month
  export const getBudgetsByMonth = async (user_id: ObjectId, date: Date): Promise<Budget[]> => {
    return await collection.find({
      user_id,
      start_date: { $lte: date },
      $or: [
        { end_date: { $gte: date } },
        { end_date: { $exists: false } },
        { end_date: null }
      ]
    }).toArray();
  }

  // Get budget for category for the current month
  export const getCategoryBudgetForMonth = async (user_id: ObjectId, category_id: string, date: Date): Promise<Budget | null> => {
    return await collection.findOne({
      user_id,
      category_id,
      start_date: { $lte: date },
      $or: [
        { end_date: { $gte: date } },
        { end_date: { $exists: false } },
        { end_date: null }
      ]
    });
  }

  // Get all general budgets by user id
  export const getGeneralBudgetsByUserId = async (user_id: ObjectId): Promise<Budget[]> => {
    return await collection.find({
      user_id,
      $or: [
        { category_id: { $exists: false } },
        { category_id: null }
      ]
    }).toArray();
  }

  // Get general budgets by user id for given month
  export const getGeneralBudgetForMonth = async (user_id: ObjectId, date: Date): Promise<Budget | null> => {
    return await collection.findOne({
      user_id,
      $and: [
        {
          $or: [
            { category_id: { $exists: false } },
            { category_id: null }
          ],
        },
        {
          $or: [
            { end_date: { $gte: date } },
            { end_date: { $exists: false } },
            { end_date: null }
          ]
        }
      ]
    });
  }

  // Get all budgets created by the same user using their user ID
  export const getBudgetsByUserId = async (user_id: ObjectId): Promise<Budget[]> => {
    return await collection.find({ user_id }).toArray();
  }

  // Delete a budget given the ID
  export const deleteBudget = async (_id: ObjectId): Promise<Budget | null> => {
    return await collection.findOneAndDelete({ _id });
  }
}
