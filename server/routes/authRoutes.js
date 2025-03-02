import express from 'express';
import { register, login, returnAllAccounts } from '../controllers/authController.js';
import { validateToken, validateAdmin } from '../middleware/authMiddleware.js';

const router =  express.Router();

router.post('/register', register);

router.post('/login', login);

export default router;