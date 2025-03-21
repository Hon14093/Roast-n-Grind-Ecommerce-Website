import express from 'express';
import { register, login, returnAllAccounts, returnAccountInfo } from '../controllers/authController.js';
import { validateToken, validateAdmin } from '../middleware/authMiddleware.js';

const router =  express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/info/:account_id', returnAccountInfo)

export default router;