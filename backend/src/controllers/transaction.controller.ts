import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { TransactionsCollection } from "../database/methods/transactions.methods";
import { Transaction } from "../models/transaction";

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const transactions = await TransactionsCollection.getTransactionsByUserId(userId) || [];

    res.send(transactions).status(200);
  } catch (err) {
    next(err); 
  }
}

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new ObjectId(req.session.userId);
    const { category_id, amount, recurring_id, payment_date } = req.body;

    const newTransaction: Transaction = {
      user_id: userId,
      amount,
      category_id,
      recurring_id,
      payment_date
    };

    const result = await TransactionsCollection.createTransaction(newTransaction)
  } catch (err) {
    next(err); 
  }
}

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await TransactionsCollection.getTransactionById(new ObjectId(req.params.id![0]));

    if (!transaction) res.send("Not found").status(404);
    else res.send(transaction).status(200);
  } catch (err) {
    next(err); 
  }
}

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedTransaction = await TransactionsCollection.deleteTransaction(new ObjectId(req.params.id![0]));

    if (!deletedTransaction) res.send("Not found").status(404);
    else res.send(deletedTransaction).status(200);
  } catch (err) {
    next(err); 
  }
}
