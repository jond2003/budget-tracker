import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createIncome, deleteIncome, getIncomeById, getIncomes, getMonthIncomes } from "../controllers/income.controller";

const router = Router();

router.get('/', requireLogin, getIncomes);
router.get('/:date', requireLogin, getMonthIncomes);
router.post('/', requireLogin, createIncome);
router.get('/:id', requireLogin, getIncomeById);
router.delete('/:id', requireLogin, deleteIncome);

export default router;