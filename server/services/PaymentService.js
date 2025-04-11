// PaymentService.js
import Stripe from 'stripe';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
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
            console.log('Starting stripeCallbackHandler with sessionId:', sessionId);

            const session = await stripe.checkout.sessions.retrieve(sessionId);
            console.log('Stripe session retrieved:', session);

            if (session.status !== 'complete') {
                throw new Error('Payment not successful');
            }

            const userId = session.metadata.userId;
            const sm_id = parseInt(session.metadata.sm_id);
            const addressId = session.metadata.addressId;
            const orderData = JSON.parse(session.metadata.orderData);

            console.log('Session metadata:', { userId, sm_id, addressId, orderData });

            const user = await prisma.account.findUnique({
                where: { account_id: userId },
            });
            if (!user) {
                throw new Error('User not found');
            }

            const totalAmount = session.amount_total;
            console.log('Total amount from Stripe session:', totalAmount);

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
            console.log('Order created successfully:', order);

            // Tạo Order_Details từ line_items
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
            console.log('Line items retrieved:', lineItems);

            // Kiểm tra orderData.cartItems
            if (!orderData.cartItems || !Array.isArray(orderData.cartItems)) {
                throw new Error('orderData.cartItems không tồn tại hoặc không phải là mảng');
            }

            // Chuẩn bị dữ liệu Order_Details để gửi qua API
            const orderDetails = [];
            for (const item of lineItems.data) {
                const productData = item.price.product;
                const product = await prisma.product.findFirst({
                    where: { product_name: productData.name },
                });

                if (!product) {
                    console.warn('Product not found for line item:', productData.name);
                    continue;
                }

                // Tìm cartItem tương ứng từ orderData.cartItems
                const cartItem = orderData.cartItems.find(cart => 
                    cart.quantity === item.quantity && 
                    cart.subtotal === item.amount_total && 
                    cart.product_name === productData.name
                );
                if (!cartItem) {
                    console.warn('Cart item not found for line item:', item);
                    continue;
                }

                // Kiểm tra xem pw_id có tồn tại trong bảng Product_Weight không
                const productWeight = await prisma.product_Weight.findUnique({
                    where: { pw_id: cartItem.pw_id },
                });

                if (!productWeight) {
                    console.error('pw_id không tồn tại trong Product_Weight:', cartItem.pw_id);
                    throw new Error(`pw_id không hợp lệ: ${cartItem.pw_id}`);
                }

                // Thêm vào danh sách orderDetails
                orderDetails.push({
                    quantity: item.quantity,
                    subtotal: item.amount_total,
                    is_ground: cartItem.is_ground || false,
                    order_id: order.order_id,
                    pw_id: cartItem.pw_id,
                });
            }

            // Gọi API để tạo Order_Details
            const response = await axios.post('http://localhost:5000/api/order/details/batch-create', {
                orderDetails,
            });

            if (response.status !== 201) {
                throw new Error('Không thể tạo Order_Details qua API');
            }

            console.log('Order_Details created via API:', response.data);

            console.log(`Payment success for user ${userId}, paymentId ${session.payment_intent}, amount ${session.amount_total}`);
            return {
                orderId: order.order_id,
                paymentIntentId: session.payment_intent,
                amount: session.amount_total,
            };
        } catch (error) {
            console.error('Error in stripeCallbackHandler:', error);
            throw new Error(`Error handling Stripe callback: ${error.message}`);
        }
    }
}