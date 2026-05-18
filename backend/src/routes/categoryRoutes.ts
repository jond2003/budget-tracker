import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createCategory, deleteCategory, getCategories, getCategoryByName, getIncomeCategories, getTransactionCategories } from "../controllers/category.controller";

const router = Router();

router.get('/', requireLogin, getCategories);
router.post('/', requireLogin, createCategory);

router.get('/income', requireLogin, getIncomeCategories);
router.get('/transaction', requireLogin, getTransactionCategories);
router.get('/:name', requireLogin, getCategoryByName);

router.delete('/:id', requireLogin, deleteCategory);

export default router;