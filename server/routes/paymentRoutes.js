// paymentRouter.js
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { createCheckoutSession, stripeCallback, checkSession } from "../controllers/stripeController.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET);
// const stripe = new Stripe('sk_test_51RC0uAP2tCpSt8NrHm2HS2fwjgYXujl51rgRW6wrXsoYIK4GjDyAEFPmTkaMgBPMJbuearlrCUFWLx0UX86leibM00YpncKsMS');

const router = express.Router();

// Tạo phiên thanh toán Stripe
router.post('/stripe/create-checkout-session', async (req,res) => {
    try {
        const { items } = req.body;        
        const lineItems = items.map((item) => ({
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.product_name,
                    images: [item.image_url],
                },
                unit_amount: Math.round(item.price),
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:5173/"
        })

        res.json({ 
            success: 1,
            id: session.id 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }

    // return res.status(200).json({ 
    //     success: 1,
    //     id: session.id
    // })
});

// Kiểm tra trạng thái thanh toán
router.get('/stripe/check-session', checkSession);

// Xử lý callback từ Stripe
router.get('/stripe/stripe-pay-callback', stripeCallback);

export default router;