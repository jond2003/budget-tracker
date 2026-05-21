import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createBudget, deleteBudget, getAllBudgets, getCategoryBudgets, getGeneralBudgets, getMonthCategoryBudget, getMonthGeneralBudget, getNetWorth } from "../controllers/budget.controller";

const router = Router();

router.get('/', requireLogin, getGeneralBudgets);
router.get('/all', requireLogin, getAllBudgets);

router.get('/month/:date', requireLogin, getMonthGeneralBudget);
router.get('/month/:date/category/:category_id', requireLogin, getMonthCategoryBudget);

router.get('/category/:category_id', requireLogin, getCategoryBudgets);

router.get('/networth', requireLogin, getNetWorth);

router.post('/', requireLogin, createBudget);
router.delete('/:id', requireLogin, deleteBudget);

export default router;