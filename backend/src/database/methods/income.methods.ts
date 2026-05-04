import { ObjectId } from "mongodb";
import { Collections } from "../../constants/db.constants";
import { Income } from "../../models/income";
import db from "../connection";

const collection = db.collection<Income>(Collections.INCOME);

export namespace IncomeCollection {}
