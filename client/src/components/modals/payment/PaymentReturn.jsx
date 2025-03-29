// src/components/PaymentReturn.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentReturn() {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get("vnp_TransactionStatus");
    const orderId = urlParams.get("vnp_TxnRef");
    const amount = urlParams.get("vnp_Amount");

    useEffect(() => {
        if (status === "00") {
            alert("Thanh toán thành công!");
            navigate("/account");
        } else {
            alert("Thanh toán thất bại. Vui lòng thử lại.");
            navigate("/checkout");
        }
    }, [status, navigate]);

    return (
        <div className="text-center p-4">
            <h1 className="text-2xl font-bold">Trạng thái thanh toán</h1>
            <p>Mã đơn hàng: {orderId || "Không xác định"}</p>
            <p>Số tiền: {amount ? (parseInt(amount) / 100) + " VND" : "Không xác định"}</p>
            <p>Trạng thái: {status === "00" ? "Thành công" : "Thất bại"}</p>
        </div>
    );
};