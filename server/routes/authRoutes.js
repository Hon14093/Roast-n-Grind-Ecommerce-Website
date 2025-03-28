import express from 'express';
import { register, login, returnAllAccounts, returnAccountInfo } from '../controllers/authController.js';
import { validateToken, validateAdmin } from '../middleware/authMiddleware.js';

const router =  express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/accounts", validateToken, validateAdmin, returnAllAccounts); // Thêm route, yêu cầu token và admin
router.get("/info/:account_id", validateToken, returnAccountInfo); // Yêu cầu token

export default router;