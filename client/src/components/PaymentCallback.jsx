// PaymentCallback.jsx (src/components/PaymentCallback.jsx)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckCircle2, XCircle } from "lucide-react"; // Biểu tượng dấu check và dấu X

const PaymentCallback = () => {
    const [message, setMessage] = useState({
        orderId: "",
        paymentIntentId: "",
        amount: "",
    });
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [title, setTitle] = useState("");
    const query = new URLSearchParams(window.location.search);
    const status = query.get("status");

    useEffect(() => {
        if (status === "success") {
            const orderId = query.get("orderId");
            const paymentIntentId = query.get("paymentIntentId");
            const amount = query.get("amount");
            // Làm gọn mã đơn hàng và mã thanh toán (lấy 8 ký tự đầu)
            const shortOrderId = orderId ? orderId.substring(0, 8) + "..." : "";
            const shortPaymentIntentId = paymentIntentId ? paymentIntentId.substring(0, 8) + "..." : "";
            setMessage({
                orderId: shortOrderId,
                paymentIntentId: shortPaymentIntentId,
                amount: amount,
            });
            setTitle("Thanh toán thành công!");

            clearCart();

            // Tự động chuyển hướng về trang chủ sau 5 giây
            setTimeout(() => {
                navigate("/");
            }, 5000);
        } else if (status === "failed") {
            const error = query.get("error");
            setMessage({ error: error || "Vui lòng thử lại." });
            setTitle("Thanh toán thất bại");
        } else {
            setMessage({ error: "Không có thông tin thanh toán." });
            setTitle("Thông báo");
        }

        // Xóa sessionId khỏi localStorage
        localStorage.removeItem('paymentSessionId');
    }, [clearCart, navigate, status]);

    const handleContinueShopping = () => {
        navigate("/shop");
    };

    if (!title) return null;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                {/* Tiêu đề và thông báo "Thanh toán thành công" trên cùng 1 hàng */}
                <div className="flex justify-center items-center mb-4">
                    <h1 className="text-3xl font-bold text-white">
                        {title}
                    </h1>
                </div>

                {/* Dấu check xanh hoặc dấu X đỏ nằm dưới thông báo */}
                {status === "success" ? (
                    <>
                        <CheckCircle2 className="text-green-500 mx-auto mb-4" size={40} />
                        <div className="text-white text-lg mb-6 space-y-2">
                            <p>Mã đơn hàng: {message.orderId}</p>
                            <p>Mã thanh toán: {message.paymentIntentId}</p>
                            <p>Tổng tiền: {message.amount} VND</p>
                            <p className="text-sm text-gray-400 mt-4">
                                Cảm ơn bạn đã mua sắm! Bạn sẽ được chuyển hướng về trang chủ trong 5 giây...
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <XCircle className="text-red-500 mx-auto mb-4" size={40} />
                        <p className="text-white text-lg mb-6">
                            {message.error}
                        </p>
                    </>
                )}

                {/* Nút tiếp tục mua sắm */}
                <button
                    onClick={handleContinueShopping}
                    className="bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Tiếp tục mua sắm
                </button>
            </div>
        </div>
    );
};

export default PaymentCallback;