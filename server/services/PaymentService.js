// PaymentService.js
import Stripe from 'stripe';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const stripe = new Stripe('sk_test_51RAS78FmUaMcgwsdgl8gev4woeYgql1WztTy6pKOMk09fP4Roc0f2wXQxVuQdlJWfBHbgrUKIAxLsPQs4NiXHaOw007RiIZmnl');

export class PaymentService {
    async createStripeCheckoutSession(userId, cartItems, sm_id, addressId, orderData) {
        try {
            if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
                throw new Error('Missing required parameters: userId or cartItems');
            }

            const user = await prisma.account.findUnique({
                where: { account_id: userId },
            });
            if (!user) {
                throw new Error('User not found');
            }

            // Tạo lineItems từ cartItems
            const lineItems = cartItems.map(item => ({
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: item.product_name,
                        images: [item.image_url],
                    },
                    unit_amount: Math.round(item.price), // VNĐ không cần nhân với 100
                },
                quantity: item.quantity,
            }));

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `http://localhost:5000/api/payment/stripe/stripe-pay-callback?status=success&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:5000/api/payment/stripe/stripe-pay-callback?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
                metadata: {
                    userId: userId,
                    sm_id: sm_id.toString(),
                    addressId: addressId,
                    orderData: JSON.stringify(orderData),
                },
            });

            return {
                paymentUrl: session.url,
                sessionId: session.id,
            };
        } catch (error) {
            console.error('Error in createStripeCheckoutSession:', error);
            throw new Error(`Error creating Stripe checkout session: ${error.message}`);
        }
    }

    async stripeCallbackHandler(sessionId) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            if (session.status !== 'complete') {
                throw new Error('Payment not successful');
            }

            const userId = session.metadata.userId;
            const sm_id = parseInt(session.metadata.sm_id);
            const addressId = session.metadata.addressId;
            const orderData = JSON.parse(session.metadata.orderData);

            const user = await prisma.account.findUnique({
                where: { account_id: userId },
            });
            if (!user) {
                throw new Error('User not found');
            }

            const totalAmount = session.amount_total;

            // Tạo Order
            const order = await prisma.order.create({
                data: {
                    order_date: new Date(),
                    order_total: totalAmount,
                    account_id: userId,
                    shipping_id: sm_id,
                    status_id: 1, // Sử dụng status_id kiểu Int (1: Đang xử lý)
                    method_id: 2, // Stripe
                    address_id: addressId, // addressId là String (UUID), phù hợp với schema
                    note: orderData.note,
                    discount_id: orderData.discount_id,
                },
            });

            // Tạo Order_Details từ line_items
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
            for (const item of lineItems.data) {
                const productData = item.price.product;
                const product = await prisma.product.findFirst({
                    where: { product_name: productData.name },
                });

                if (product) {
                    await prisma.order_Details.create({
                        data: {
                            quantity: item.quantity,
                            subtotal: item.amount_total,
                            is_ground: false,
                            order_id: order.order_id,
                            pw_id: '550e8400-e29b-41d4-a716-446655440001', // Thay bằng giá trị thực tế
                        },
                    });
                }
            }

            console.log(`Payment success for user ${userId}, paymentId ${session.payment_intent}, amount ${session.amount_total}`);
            return {
                orderId: order.order_id,
                paymentIntentId: session.payment_intent,
                amount: session.amount_total,
            };
        } catch (error) {
            throw new Error(`Error handling Stripe callback: ${error.message}`);
        }
    }
}