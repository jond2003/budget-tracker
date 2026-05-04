import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import { Expense } from "../../models/expense";
import db from "../connection";

const collection = db.collection<Expense>(Collections.EXPENSES);

export namespace ExpensesCollection {}
