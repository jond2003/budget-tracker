import { Router } from 'express';
import { login, logout, register } from '../controllers/user.controller';
import requireLogin from '../middlewares/loginHandler';

const router = Router();


// router.get('/', requireLogin, getUserDetails);
router.post('/login', login);
router.post('/logout', requireLogin, logout);
router.post('/register', register);
// router.put('/', requireLogin, updateUserDetails);

export default router;