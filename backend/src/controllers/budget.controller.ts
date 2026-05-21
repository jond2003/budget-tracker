import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { BudgetsCollection } from "../database/methods/budgets.methods";
import { Budget } from "../models/budget";
import { IncomesCollection } from "../database/methods/incomes.methods";
import { TransactionsCollection } from "../database/methods/transactions.methods";

export const getGeneralBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const budgets = await BudgetsCollection.getGeneralBudgetsByUserId(userId) || [];

    res.send(budgets).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getAllBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const budgets = await BudgetsCollection.getAllBudgetsByUserId(userId) || [];

    res.send(budgets).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getMonthGeneralBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const date = new Date(req.params.date! as string);
    const budget = await BudgetsCollection.getGeneralBudgetForMonth(userId, date);

    res.send(budget).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getCategoryBudgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const category_id = req.params.category_id! as string;
    const budgets = await BudgetsCollection.getBudgetsByCategory(userId, category_id) || [];

    res.send(budgets).status(200);
  } catch (err) {
    next(err); 
  }
}

export const getMonthCategoryBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const date = new Date(req.params.date! as string);
    const category_id = req.params.category_id! as string;
    const budget = await BudgetsCollection.getCategoryBudgetForMonth(userId, category_id, date);

    res.send(budget).status(200);
  } catch (err) {
    next(err); 
  }
}

export const createBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const { amount, name, start_date, end_date, category_id } = req.body;

    const newBudget: Budget = {
      user_id: userId,
      name,
      amount,
      start_date,
      end_date,
      category_id
    };

    const result = await BudgetsCollection.createBudget(newBudget);
    if (result) res.send(result).status(200);
  } catch (err) {
    next(err);
  }
}

export const getNetWorth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);

    const incomesTotal = await IncomesCollection.getTotalIncomeAmount(userId);
    const transactionsTotal = await TransactionsCollection.getTotalTransactionAmount(userId);
    const netWorth = incomesTotal - transactionsTotal;

    res.send(netWorth).status(200);
  } catch (err) {
    next(err); 
  }
}

export const deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedBudget = await BudgetsCollection.deleteBudget(new ObjectId(req.params.id![0]));

    if (!deletedBudget) res.send("Not found").status(404);
    else res.send(deletedBudget).status(200);
  } catch (err) {
    next(err); 
  }
}
