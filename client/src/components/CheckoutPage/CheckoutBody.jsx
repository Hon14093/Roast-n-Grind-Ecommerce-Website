// components/CheckoutPage/CheckoutBody.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "@/hooks/productAPI";
import { useNavigate } from "react-router-dom";

export default function CheckoutBody() {
    const { cartItems, setCartItems } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    const shippingFee = totalPrice < 100000 ? 30000 : 0;
    const finalTotal = totalPrice + shippingFee;

    const handleCheckout = async () => {
        if (!user?.account_id) {
            setError("Vui lòng đăng nhập để thanh toán.");
            return;
        }
        if (cartItems.length === 0) {
            setError("Giỏ hàng trống, không thể thanh toán.");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                account_id: user.account_id,
                order_total: finalTotal,
                order_date: new Date().toISOString(),
                note: "Đơn hàng từ checkout",
                status_id: 1,
                shipping_id: 1,
                discount_id: null,
                order_details: cartItems.map(item => ({
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity,
                    is_ground: item.grind,
                    pw_id: item.pw_id,
                })),
            };
            const response = await createOrder(orderData);
            console.log("Đơn hàng đã được tạo:", response);
            setCartItems([]);
            navigate("/payment", { state: { order: response.order, total: finalTotal } });
        } catch (err) {
            setError(err.message || "Không thể tạo đơn hàng.");
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-darkOlive mb-6">Thanh toán</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-600">Giỏ hàng trống, không thể thanh toán.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-darkOlive mb-4">Sản phẩm trong giỏ</h2>
                        {cartItems.map((item) => (
                            <div key={`${item.product_id}-${item.weight_id}`} className="flex gap-4 mb-4">
                                <img
                                    src={item.image_url}
                                    alt={item.product_name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.product_name}</p>
                                    <p className="text-sm">Size: {item.weight_name}</p>
                                    <p className="text-sm">Số lượng: {item.quantity}</p>
                                    <p className="text-sm">Xay: {item.grind ? "Có" : "Không"}</p>
                                    <p className="text-sm">Thành tiền: {item.price * item.quantity} vnđ</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-darkOlive mb-4">Thông tin thanh toán</h2>
                        <div className="space-y-2">
                            <p className="flex justify-between">
                                <span>Tổng tiền hàng:</span>
                                <span>{totalPrice} vnđ</span>
                            </p>
                            <p className="flex justify-between">
                                <span>Phí vận chuyển:</span>
                                <span>{shippingFee} vnđ</span>
                            </p>
                            <p className="flex justify-between font-bold">
                                <span>Tổng cộng:</span>
                                <span>{finalTotal} vnđ</span>
                            </p>
                        </div>
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full mt-4 bg-darkOlive text-ivory py-2 rounded-md hover:bg-darkOlive/90 disabled:bg-gray-400"
                        >
                            {loading ? "Đang xử lý..." : "Thanh toán ngay"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}