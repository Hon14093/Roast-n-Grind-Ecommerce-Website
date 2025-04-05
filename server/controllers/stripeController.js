// stripeController.js
import { PaymentService } from '../services/PaymentService.js';
import Stripe from 'stripe';

const paymentService = new PaymentService();
const stripe = new Stripe('sk_test_51RAS78FmUaMcgwsdgl8gev4woeYgql1WztTy6pKOMk09fP4Roc0f2wXQxVuQdlJWfBHbgrUKIAxLsPQs4NiXHaOw007RiIZmnl');

export const createCheckoutSession = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Missing required parameters: userId or cartItems',
            });
        }

        const stripeResponse = await paymentService.createStripeCheckoutSession(userId, cartItems);

        return res.status(200).json({
            status: 'OK',
            message: 'Success',
            data: stripeResponse,
        });
    } catch (error) {
        console.error('Error in createCheckoutSession:', error);
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'Error creating Stripe checkout session',
            error: error.message,
        });
    }
};

export const stripeCallback = async (req, res) => {
    try {
        const { status, session_id } = req.query;

        if (!status || !session_id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Missing required parameters: status or session_id',
            });
        }

        if (status === 'canceled') {
            return res.redirect('http://localhost:5173/payment/stripe-pay-callback?status=failed');
        }

        const paymentData = await paymentService.stripeCallbackHandler(session_id);

        return res.redirect(
            `http://localhost:5173/payment/stripe-pay-callback?status=success&orderId=${paymentData.orderId}&paymentIntentId=${paymentData.paymentIntentId}&amount=${paymentData.amount}`
        );
    } catch (error) {
        console.error('Error in stripeCallback:', error);
        return res.redirect(
            `http://localhost:5173/payment/stripe-pay-callback?status=failed&error=${encodeURIComponent(error.message)}`
        );
    }
};

export const checkSession = async (req, res) => {
    try {
        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Missing required parameter: session_id',
            });
        }

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.status === 'complete') {
            const paymentData = await paymentService.stripeCallbackHandler(session_id);
            return res.status(200).json({
                status: 'success',
                orderId: paymentData.orderId,
                paymentIntentId: paymentData.paymentIntentId,
                amount: paymentData.amount,
            });
        } else if (session.status === 'expired') {
            return res.status(200).json({
                status: 'canceled',
                message: 'Payment session expired',
            });
        } else {
            return res.status(200).json({
                status: 'pending',
                message: 'Payment session still pending',
            });
        }
    } catch (error) {
        console.error('Error in checkSession:', error);
        return res.status(500).json({
            status: 'Internal Server Error',
            message: 'Error checking Stripe session',
            error: error.message,
        });
    }
};