import { Router } from 'express';
import { authenticateUser } from '../controllers/auth.controller';

const router = Router();


router.get('/me', authenticateUser);

export default router;