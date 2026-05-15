import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CategoriesCollection } from "../database/methods/categories.methods";
import { Category } from "../models/category";

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const categories = await CategoriesCollection.getCategoriesByUserId(userId) || [];

    res.send(categories).status(200);
  } catch (err) {
    next(err); 
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const { name, colour, payment_type } = req.body;

    const newCategory: Category = {
      user_id: userId,
      name,
      colour,
      payment_type
    };

    const result = await CategoriesCollection.createCategory(newCategory);
    if (result) res.send(result).status(200);
  } catch (err) {
    next(err);
  }
}

export const getCategoryByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);

    const category = await CategoriesCollection.getCategoryByName(userId, req.params.name![0]!);

    if (!category) res.send("Not found").status(404);
    else res.send(category).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getIncomeCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const categories = await CategoriesCollection.getCategoriesByType(userId, 'income') || [];

    res.send(categories).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getTransactionCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const categories = await CategoriesCollection.getCategoriesByType(userId, 'transaction') || [];

    res.send(categories).status(200);
  } catch (err) {
    next(err); 
  }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedCategory = await CategoriesCollection.deleteCategory(new ObjectId(req.params.id![0]));

    if (!deletedCategory) res.send("Not found").status(404);
    else res.send(deletedCategory).status(200);
  } catch (err) {
    next(err); 
  }
}