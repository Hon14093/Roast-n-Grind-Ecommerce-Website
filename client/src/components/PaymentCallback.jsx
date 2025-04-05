// PaymentCallback.jsx (src/components/PaymentCallback.jsx)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PaymentCallback = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const status = query.get("status");

        if (status === "success") {
            const orderId = query.get("orderId");
            const paymentIntentId = query.get("paymentIntentId");
            const amount = query.get("amount");
            setMessage(`Thanh toán thành công! Mã đơn hàng: ${orderId}, Mã thanh toán: ${paymentIntentId}, Tổng tiền: $${amount}`);
            
            // Xóa giỏ hàng sau khi thanh toán thành công
            clearCart();

            // Tự động chuyển hướng về trang chủ sau 3 giây
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } else if (status === "failed") {
            const error = query.get("error");
            setMessage(`Thanh toán thất bại: ${error || "Vui lòng thử lại."}`);
        } else {
            setMessage("Không có thông tin thanh toán.");
        }

        // Xóa sessionId khỏi localStorage
        localStorage.removeItem('paymentSessionId');
    }, [clearCart, navigate]);

    const handleContinueShopping = () => {
        navigate("/shop");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {message.includes("Thành công") ? "Thanh toán thành công!" : "Thanh toán thất bại"}
                </h1>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={handleContinueShopping}
                    className="bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-2 px-4 rounded-lg"
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        </div>
    );
};

export default PaymentCallback;