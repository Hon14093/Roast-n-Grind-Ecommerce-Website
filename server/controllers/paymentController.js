
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

    const cart = await getShoppingCartByUserId(accountId);
    if (!cart) return res.status(400).json({ error: 'Không tìm thấy giỏ hàng' });

    const cartDetails = await getCartDetailsByCartId(cart.cart_id);
    if (!cartDetails || cartDetails.length === 0) {
      return res.status(400).json({ error: 'Giỏ hàng trống' });
    }

    const orderTotal = cartDetails.reduce((total, item) => total + item.item_subtotal, 0);
    const order = await prisma.order.create({
      data: {
        order_date: new Date(),
        order_total: orderTotal,
        account_id: accountId,
        shipping_id: 1,
        status_id: 1,
        address_id: req.body.address_id || (await prisma.user_Address.findFirst({ where: { account_id: accountId } })).address_id,
        discount_id: req.body.discount_id || null,
        Order_Details: {
          create: cartDetails.map(item => ({
            quantity: item.quantity,
            subtotal: item.item_subtotal,
            is_ground: item.is_ground || false,
            pw_id: item.pw_id,
          })),
        },
      },
    });

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
    const signData = Object.keys(sortedParams)
      .map(key => `${key}=${encodeURIComponent(sortedParams[key]).replace(/%20/g, '+')}`)
      .join('&');
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    sortedParams.vnp_SecureHash = signed;

    const vnpUrl = `${vnpayConfig.vnp_Url}?${new URLSearchParams(sortedParams).toString()}`;

    res.json({ paymentUrl: vnpUrl, orderId: order.order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi khi tạo URL thanh toán', details: error.message });
  }
};

// Hàm handleVnpayReturn giữ nguyên
export const handleVnpayReturn = async (req, res) => {
  try {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    const sortedParams = sortObject(vnp_Params);
    const signData = Object.keys(sortedParams)
      .map(key => `${key}=${encodeURIComponent(sortedParams[key]).replace(/%20/g, '+')}`)
      .join('&');
    const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    if (secureHash !== signed) {
      return res.status(400).json({ error: 'Chữ ký không hợp lệ' });
    }

    const orderId = vnp_Params['vnp_TxnRef'];
    const rspCode = vnp_Params['vnp_ResponseCode'];

    const order = await prisma.order.findUnique({ where: { order_id: orderId } });
    if (!order) {
      return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
    }

    if (rspCode === '00') {
      await prisma.order.update({
        where: { order_id: orderId },
        data: { status_id: 2 },
      });
      const cart = await getShoppingCartByUserId(order.account_id);
      if (cart) {
        await prisma.cart_Details.deleteMany({
          where: { cart_id: cart.cart_id },
        });
      }
      res.status(200).json({ message: 'Thanh toán thành công', orderId });
    } else {
      await prisma.order.update({
        where: { order_id: orderId },
        data: { status_id: 3 },
      });
      res.status(400).json({ message: 'Thanh toán thất bại', errorCode: rspCode });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi xử lý callback', details: error.message });
  }
};