// pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cart from "@/components/layout/Cart";
import Payment from "@/components/Payment";

export default function PaymentPage() {
    const { state } = useLocation(); // Lấy dữ liệu từ CheckoutBody
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    const order = state?.order || {};
    const total = state?.total || 0;

    if (!order.order_id || total <= 0) {
        return (
            <div className="text-darkOlive bg-ivory min-h-screen flex flex-col">
                <Cart isOpen={isOpen} toggleCart={toggleCart} />
                <Header darkBG={false} toggleCart={toggleCart} />
                <main className="px-10 relative pt-20 flex-1">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-darkOlive mb-6">Xác nhận thanh toán</h1>
                        <p className="text-gray-600">Không có thông tin đơn hàng để thanh toán.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="text-darkOlive bg-ivory min-h-screen flex flex-col">
            <Cart isOpen={isOpen} toggleCart={toggleCart} />
            <Header darkBG={false} toggleCart={toggleCart} />
            <main className="px-10 relative pt-20 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-darkOlive mb-6">Xác nhận thanh toán</h1>
                    <Payment orderId={order.order_id} amount={total} />
                </div>
            </main>
            <Footer />
        </div>
    );
}