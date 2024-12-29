import express from 'express';
import { register, login, returnAllAccounts } from '../controllers/authController.js';

const router =  express.Router();

// Route for registration
router.post('/register', register);

router.post('/login', login);

router.get('/accounts', returnAllAccounts);

export default router;