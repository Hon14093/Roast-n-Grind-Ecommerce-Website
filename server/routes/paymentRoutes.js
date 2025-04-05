// paymentRouter.js
import express from "express";
import { createCheckoutSession, stripeCallback, checkSession } from "../controllers/stripeController.js";

const router = express.Router();

// Tạo phiên thanh toán Stripe
router.post('/stripe/create-checkout-session', createCheckoutSession);

// Kiểm tra trạng thái thanh toán
router.get('/stripe/check-session', checkSession);

// Xử lý callback từ Stripe
router.get('/stripe/stripe-pay-callback', stripeCallback);

export default router;