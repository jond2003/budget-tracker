import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createTransaction, deleteTransaction, getTransactionById, getTransactions } from "../controllers/transaction.controller";

const router = Router();

router.get('/', requireLogin, getTransactions);
router.post('/', requireLogin, createTransaction);
router.get('/:id', requireLogin, getTransactionById);
router.delete('/:id', requireLogin, deleteTransaction);
