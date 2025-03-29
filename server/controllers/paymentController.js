import prisma from '../prisma/prisma.js';
import crypto from 'crypto';
import querystring from 'querystring';
import vnpayConfig from '../VNPay/vnpay_config.js';
import { getShoppingCartByUserId } from '../models/Shopping_Cart.js';
import { getCartDetailsByCartId } from '../models/Cart_Details.js';

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach(key => sorted[key] = obj[key]);
  return sorted;
}

export const createPaymentUrl = async (req, res) => {
  try {
    const accountId = req.user?.account_id;
    if (!accountId) return res.status(401).json({ error: 'Người dùng chưa đăng nhập' });

    const { address_id, discount_code, shipping_id, note } = req.body;

    // Kiểm tra địa chỉ giao hàng
    const userAddress = await prisma.user_Address.findFirst({
      where: { account_id: accountId, address_id },
    });
    if (!userAddress) return res.status(400).json({ error: 'Địa chỉ giao hàng không hợp lệ' });

    // Lấy giỏ hàng
    const cart = await getShoppingCartByUserId(accountId);
    if (!cart) return res.status(400).json({ error: 'Giỏ hàng không tồn tại' });
    const cartDetails = await getCartDetailsByCartId(cart.cart_id);
    if (cartDetails.length === 0) return res.status(400).json({ error: 'Giỏ hàng trống' });

    // Tính tổng tiền từ giỏ hàng
    const subtotal = cartDetails.reduce((sum, item) => sum + item.quantity * item.Product_Weight.product_price, 0);

    // Kiểm tra và áp dụng mã giảm giá
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
      if (discount) {
        discountValue = Math.min(discount.discount_value, discount.max_discount_amount);
        discountId = discount.discount_id;
      }
    }

    // Lấy phí vận chuyển
    const shippingMethod = await prisma.shipping_Method.findUnique({
      where: { shipping_id: shipping_id || 1 },
    });
    if (!shippingMethod) return res.status(400).json({ error: 'Phương thức vận chuyển không hợp lệ' });
    const shippingPrice = shippingMethod.shipping_price;

    // Tổng tiền cuối cùng
    const orderTotal = subtotal - discountValue + shippingPrice;
    if (orderTotal <= 0) return res.status(400).json({ error: 'Tổng tiền không hợp lệ' });

    // Tạo đơn hàng
    const pendingStatus = await prisma.order_Status.findFirst({ where: { status_name: 'Pending' } });
    const order = await prisma.order.create({
      data: {
        order_date: new Date(),
        order_total: orderTotal,
        account_id: accountId,
        shipping_id: shippingMethod.shipping_id,
        status_id: pendingStatus.status_id,
        address_id, // Thêm address_id vào đơn hàng
        discount_id: discountId,
        note: note || null,
        Order_Details: {
          create: cartDetails.map(item => ({
            quantity: item.quantity,
            subtotal: item.quantity * item.Product_Weight.product_price,
            is_ground: item.is_ground || false,
            pw_id: item.pw_id,
          })),
        },
      },
    });

    // Tạo URL VNPay
    const date = new Date();
    const createDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: vnpayConfig.vnp_TmnCode,
      vnp_Amount: orderTotal * 100,
      vnp_CreateDate: createDate,
      vnp_CurrCode: 'VND',
      vnp_IpAddr: ipAddr,
      vnp_Locale: 'vn',
      vnp_OrderInfo: `Thanh toan don hang ${order.order_id}`,
      vnp_OrderType: '250000',
      vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
      vnp_TxnRef: order.order_id,
    };

    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams.vnp_SecureHash = signed;

    const vnpUrl = `${vnpayConfig.vnp_Url}?${new URLSearchParams(sortedParams).toString()}`;
    res.json({ paymentUrl: vnpUrl, orderId: order.order_id });
  } catch (error) {
    console.error("Lỗi khi tạo URL thanh toán:", error);
    res.status(500).json({ error: 'Lỗi khi tạo URL thanh toán', details: error.message });
  }
};

export const handleVnpayReturn = async (req, res) => {
    try {
      let vnp_Params = req.query;
      const secureHash = vnp_Params['vnp_SecureHash'];
  
      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];
  
      const sortedParams = sortObject(vnp_Params);
      const signData = querystring.stringify(sortedParams, { encode: false });
      const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
      const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  
      if (secureHash !== signed) {
        return res.status(400).json({ error: 'Chữ ký không hợp lệ' });
      }
  
      const orderId = vnp_Params['vnp_TxnRef'];
      const rspCode = vnp_Params['vnp_ResponseCode'];
  
      const order = await prisma.order.findUnique({ where: { order_id: orderId } });
      if (!order) return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
  
      const pendingStatus = await prisma.order_Status.findFirst({ where: { status_name: 'Pending' } });
      if (order.status_id !== pendingStatus.status_id) {
        return res.status(400).json({ error: 'Đơn hàng đã được xử lý trước đó' });
      }
  
      const successStatus = await prisma.order_Status.findFirst({ where: { status_name: 'Success' } });
      const failedStatus = await prisma.order_Status.findFirst({ where: { status_name: 'Failed' } });
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
      if (rspCode === '00') {
        const cart = await getShoppingCartByUserId(order.account_id);
        await prisma.$transaction([
          prisma.order.update({
            where: { order_id: orderId },
            data: { status_id: successStatus.status_id },
          }),
          prisma.cart_Details.deleteMany({
            where: { cart_id: cart.cart_id },
          }),
        ]);
        res.redirect(`${frontendUrl}/payment-success?orderId=${orderId}`);
      } else {
        await prisma.order.update({
          where: { order_id: orderId },
          data: { status_id: failedStatus.status_id },
        });
        res.redirect(`${frontendUrl}/payment-failed?errorCode=${rspCode}`);
      }
    } catch (error) {
      console.error("Lỗi xử lý callback:", error);
      res.status(500).json({ error: 'Lỗi xử lý callback', details: error.message });
    }
  };