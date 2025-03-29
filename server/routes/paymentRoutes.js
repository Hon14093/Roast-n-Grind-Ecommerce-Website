// routes/paymentRouter.js
import express from "express";
import { createPaymentUrl, handleVnpayReturn } from "../controllers/paymentController.js";

const router = express.Router();

// Tạo URL thanh toán VNPAY
router.post('/create_payment_url', (req, res) => {
    console.log('Received POST request to /create_payment_url');
    createPaymentUrl(req, res);
});

// Xử lý khách hàng quay lại từ VNPAY (Return URL)
router.get('/vnpay_return', handleVnpayReturn);

// Endpoint callback từ VNPAY (server-side)
router.post('/callback', handleVnpayReturn);

export default router;