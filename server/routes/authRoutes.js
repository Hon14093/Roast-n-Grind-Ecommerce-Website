import express from 'express';
import { register } from '../controllers/authController';

const router =  express.Router();

// Route for registration
router.post('/register', register);

export default router;