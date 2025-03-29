// src/components/PaymentSuccess.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccess() {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("vnp_TransactionStatus");
    const orderId = urlParams.get("vnp_TxnRef");
    const amount = urlParams.get("vnp_Amount");

    useEffect(() => {
        if (status === "00") {
            console.log("Thanh toán thành công:", { orderId, amount });
            setTimeout(() => navigate("/account"), 3000);
        } else {
            console.log("Thanh toán thất bại:", { orderId, status });
            setTimeout(() => navigate("/checkout"), 3000);
        }
    }, [status, orderId, navigate]);

    return (
        <div className="text-center p-4">
            <h1 className="text-2xl font-bold">Trạng thái thanh toán</h1>
            {status === "00" ? (
                <>
                    <CheckCircle2 className="mx-auto mt-4" size={80} color="green" />
                    <p className="text-xl mt-4">Thanh toán thành công!</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Cảm ơn bạn đã mua sắm. Bạn sẽ được chuyển hướng đến trang tài khoản trong giây lát...
                    </p>
                </>
            ) : (
                <>
                    <p className="text-xl mt-4 text-red-500">Thanh toán thất bại</p>
                    <p className="text-sm text-gray-600 mt-2">
                        Đã xảy ra lỗi. Bạn sẽ được chuyển hướng về trang checkout trong giây lát...
                    </p>
                </>
            )}
            <p className="mt-2">Mã đơn hàng: {orderId || "Không xác định"}</p>
            <p>Số tiền: {amount ? (parseInt(amount) / 100) + " VND" : "Không xác định"}</p>
        </div>
    );
};