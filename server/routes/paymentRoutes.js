import express from 'express';
import { createPaymentUrl, handleVnpayReturn } from '../controllers/paymentController.js';

const router = express.Router();

// Định nghĩa route
router.post('/create_payment_url', (req, res) => {
  console.log('Received POST request to /create_payment_url');
  createPaymentUrl(req, res);
});

router.get('/vnpay_return', handleVnpayReturn);

export default router;