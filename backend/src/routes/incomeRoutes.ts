import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createIncome, deleteIncome, editIncome, getCategoryIncomes, getIncomeById, getIncomes, getMonthCategoryIncomes, getMonthIncomes } from "../controllers/income.controller";

const router = Router();

router.get('/', requireLogin, getIncomes);
router.post('/', requireLogin, createIncome);
router.get('/:id', requireLogin, getIncomeById);
router.delete('/:id', requireLogin, deleteIncome);

router.get('/month/:date', requireLogin, getMonthIncomes);
router.get('/month/:date/category/:category_id', requireLogin, getMonthCategoryIncomes);

router.get('/category/:category_id', requireLogin, getCategoryIncomes);

router.put('/', requireLogin, editIncome);

export default router;