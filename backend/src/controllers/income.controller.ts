import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { IncomesCollection } from "../database/methods/incomes.methods";
import { Income } from "../models/income";

export const getIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const incomes = await IncomesCollection.getIncomesByUserId(userId) || [];

    res.send(incomes).status(200);
  } catch (err) {
    next(err);
  }
}

export const getMonthIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const date = new Date(req.params.date! as string);
    const incomes = await IncomesCollection.getIncomesByMonth(userId, date) || [];

    res.send(incomes).status(200);
  } catch (err) {
    next(err);
  }
}

export const createIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const { category_id, amount, label, recurring_id, payment_date } = req.body;

    const newIncome: Income = {
      user_id: userId,
      amount,
      label,
      category_id,
      recurring_id,
      payment_date: new Date(payment_date)
    };

    const result = await IncomesCollection.createIncome(newIncome);
    if (result) res.send(result).status(200);
  } catch (err) {
    next(err);
  }
}

export const getIncomeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const income = await IncomesCollection.getIncomeById(new ObjectId(req.params.id![0]));

    if (!income) res.send("Not found").status(404);
    else res.send(income).status(200);
  } catch (err) {
    next(err);
  }
}

export const getMonthCategoryIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const date = new Date(req.params.date! as string);
    const category_id = req.params.category_id! as string;
    const incomes = await IncomesCollection.getCategoryIncomesByMonth(userId, date, category_id) || [];

    res.send(incomes).status(200);
  } catch (err) {
    next(err);
  }
}

export const getCategoryIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const category_id = req.params.category_id! as string;
    const incomes = await IncomesCollection.getIncomesByCategory(userId, category_id) || [];

    res.send(incomes).status(200);
  } catch (err) {
    next(err);
  }
}

export const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedIncome = await IncomesCollection.deleteIncome(new ObjectId(req.params.id![0]));

    if (!deletedIncome) res.send("Not found").status(404);
    else res.send(deletedIncome).status(200);
  } catch (err) {
    next(err);
  }
}
