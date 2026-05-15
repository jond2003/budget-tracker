import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createBudget, deleteBudget, getCategoryBudgets, getGeneralBudgets, getMonthCategoryBudget, getMonthGeneralBudget } from "../controllers/budget.controller";

const router = Router();

router.get('/', requireLogin, getGeneralBudgets);

router.get('/month/:date', requireLogin, getMonthGeneralBudget);
router.get('/month/:date/category/:category_id', requireLogin, getMonthCategoryBudget);

router.get('/category/:category_id', requireLogin, getCategoryBudgets);

router.post('/', requireLogin, createBudget);
router.delete('/:id', requireLogin, deleteBudget);

export default router;