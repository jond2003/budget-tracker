import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createTransaction, deleteTransaction, getCategoryTransactions, getMonthCategoryTransactions, getMonthTransactions, getTransactionById, getTransactions, editTransaction } from "../controllers/transaction.controller";

const router = Router();

router.get('/', requireLogin, getTransactions);
router.post('/', requireLogin, createTransaction);
router.get('/:id', requireLogin, getTransactionById);
router.delete('/:id', requireLogin, deleteTransaction);

router.get('/month/:date', requireLogin, getMonthTransactions);
router.get('/month/:date/category/:category_id', requireLogin, getMonthCategoryTransactions);

router.get('/category/:category_id', requireLogin, getCategoryTransactions);

router.put('/', requireLogin, editTransaction);

export default router;