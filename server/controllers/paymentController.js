// controllers/paymentController.js
import qs from 'qs';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '../services/PaymentService.js';
import { getShoppingCartByUserId } from '../models/Shopping_Cart.js';
import { getCartDetailsByCartId } from '../models/Cart_Details.js';

const prisma = new PrismaClient();
const paymentService = new PaymentService();

function sortObject(obj) {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach(key => sorted[key] = obj[key]);
    return sorted;
}

export const createPaymentUrl = async (req, res) => {
    try {
        const accountId = req.user?.account_id;
        console.log("Account ID:", accountId);
        if (!accountId) {
            console.error("Lỗi xác thực: Người dùng chưa đăng nhập");
            return res.status(401).json({ error: 'Người dùng chưa đăng nhập' });
        }

        const { address_id, discount_code, shipping_id, note } = req.body;
        console.log("Request body:", req.body);

        // Kiểm tra địa chỉ giao hàng
        const userAddress = await prisma.user_Address.findFirst({
            where: { account_id: accountId, address_id },
        });
        console.log("User Address:", userAddress);
        if (!userAddress) {
            console.error("Lỗi validation: Địa chỉ giao hàng không hợp lệ");
            return res.status(400).json({ error: 'Địa chỉ giao hàng không hợp lệ' });
        }

        // Kiểm tra giỏ hàng
        const cart = await getShoppingCartByUserId(accountId);
        console.log("Cart:", cart);
        if (!cart) {
            console.error("Lỗi validation: Giỏ hàng không tồn tại");
            return res.status(400).json({ error: 'Giỏ hàng không tồn tại' });
        }

        const cartDetails = await getCartDetailsByCartId(cart.cart_id);
        console.log("Cart Details:", cartDetails);
        if (cartDetails.length === 0) {
            console.error("Lỗi validation: Giỏ hàng trống");
            return res.status(400).json({ error: 'Giỏ hàng trống' });
        }

        // Kiểm tra số lượng tồn kho
        for (const item of cartDetails) {
            const productWeight = item.Product_Weight;
            if (productWeight.qty_in_stock < item.quantity) {
                console.error(`Lỗi tồn kho: Sản phẩm ${productWeight.Product.product_name} (pw_id: ${productWeight.pw_id}) không đủ hàng. Yêu cầu: ${item.quantity}, Tồn kho: ${productWeight.qty_in_stock}`);
                return res.status(400).json({ error: `Sản phẩm ${productWeight.Product.product_name} không đủ hàng. Tồn kho: ${productWeight.qty_in_stock}` });
            }
        }

        const subtotal = cartDetails.reduce((sum, item) => sum + item.quantity * item.Product_Weight.product_price, 0);
        console.log("Subtotal:", subtotal);

        let discountValue = 0;
        let discountId = null;
        if (discount_code) {
            const discount = await prisma.discount.findFirst({
                where: {
                    discount_code,
                    is_active: true,
                    start_date: { lte: new Date() },
                    end_date: { gte: new Date() },
                    min_order_amount: { lte: subtotal },
                },
            });
            console.log("Discount:", discount);
            if (discount) {
                discountValue = Math.min(discount.discount_value, discount.max_discount_amount);
                discountId = discount.discount_id;
            }
        }

        const shippingMethod = await prisma.shipping_Method.findUnique({
            where: { shipping_id: shipping_id || 1 },
        });
        console.log("Shipping Method:", shippingMethod);
        if (!shippingMethod) {
            console.error("Lỗi validation: Phương thức vận chuyển không hợp lệ");
            return res.status(400).json({ error: 'Phương thức vận chuyển không hợp lệ' });
        }
        const shippingPrice = shippingMethod.shipping_price;

        const orderTotal = subtotal - discountValue + shippingPrice;
        console.log("Order Total:", orderTotal);
        if (orderTotal <= 0) {
            console.error("Lỗi validation: Tổng tiền không hợp lệ");
            return res.status(400).json({ error: 'Tổng tiền không hợp lệ' });
        }

        // Gọi PaymentService để tạo URL thanh toán VNPAY
        req.query.amount = orderTotal.toString();
        const response = await paymentService.createVNPayPayment(accountId, 'package1', 1, req);

        return res.status(200).json(response);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error("Lỗi kết nối: Không thể kết nối đến VNPAY", error);
            return res.status(503).json({ error: 'Không thể kết nối đến VNPAY. Vui lòng thử lại sau.' });
        } else if (error.name === 'ValidationError') {
            console.error("Lỗi validation:", error);
            return res.status(400).json({ error: 'Dữ liệu không hợp lệ', details: error.message });
        } else {
            console.error("Lỗi không xác định khi tạo URL thanh toán:", error);
            return res.status(500).json({ error: 'Lỗi khi tạo URL thanh toán', details: error.message });
        }
    }
};

export const handleVnpayReturn = async (req, res) => {
    try {
        const eventId = await paymentService.payCallbackHandler(req);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

        if (req.query.vnp_ResponseCode === '00') {
            res.redirect(`${frontendUrl}/payment/success?eventId=${eventId}`);
        } else {
            res.redirect(`${frontendUrl}/payment/failed?errorCode=${req.query.vnp_ResponseCode}`);
        }
    } catch (error) {
        console.error("Lỗi xử lý callback:", error);
        res.status(500).json({ error: 'Lỗi xử lý callback', details: error.message });
    }
};