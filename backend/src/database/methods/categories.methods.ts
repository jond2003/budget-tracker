import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import db from "../connection";
import { Category } from "../../models/category";

const collection = db.collection<Category>(Collections.TRANSACTIONS);

export namespace CategoriesCollection {
  // Create a category document
  export const createCategory = async (newCategory: Category): Promise<ObjectId> => {
    return (await collection.insertOne(newCategory as any)).insertedId;
  }

  // Get single category by its name
  export const getCategoryByName = async (user_id: ObjectId, name: string): Promise<Category | null> => {
    return await collection.findOne({ user_id, name });
  }

  // Get all categories created by the same user using their user ID
  export const getCategoriesByUserId = async (user_id: ObjectId): Promise<Category[]> => {
    return await collection.find({ user_id }).toArray();
  }

  // Delete a category given the ID
  export const deleteCategory = async (_id: ObjectId): Promise<Category | null> => {
    return await collection.findOneAndDelete({ _id });
  }
}
