import { Router } from "express";
import requireLogin from "../middlewares/loginHandler";
import { createCategory, deleteCategory, getCategories, getCategoryByName } from "../controllers/category.controller";

const router = Router();

router.get('/', requireLogin, getCategories);
router.post('/', requireLogin, createCategory);
router.get('/:name', requireLogin, getCategoryByName);
router.delete('/:id', requireLogin, deleteCategory);

export default router;