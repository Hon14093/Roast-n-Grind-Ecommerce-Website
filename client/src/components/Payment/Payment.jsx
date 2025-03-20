// components/Payment.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Payment({ orderId, amount }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user?.account_id) {
            setError("Vui lòng đăng nhập để thanh toán.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/create_payment_url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    amount,
                    orderId,
                    orderDescription: `Thanh toán đơn hàng ${orderId}`,
                }),
            });

            const data = await response.json();
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl; // Chuyển hướng đến VNPAY
            } else {
                setError(data.error || "Không thể tạo URL thanh toán");
            }
        } catch (err) {
            setError("Lỗi kết nối server: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/checkout"); // Quay lại trang checkout
    };

    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Thanh toán qua VNPAY</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            <strong>Mã đơn hàng:</strong> {orderId}
                        </p>
                        <p className="text-lg font-bold">
                            <strong>Số tiền:</strong> {amount} VND
                        </p>
                        <p className="text-sm text-gray-500">
                            Thanh toán sẽ được thực hiện qua VNPAY. Vui lòng kiểm tra thông tin trước khi tiếp tục.
                        </p>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-darkOlive text-ivory hover:bg-darkOlive/90"
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Thanh toán"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 border-darkOlive text-darkOlive hover:bg-darkOlive/10"
                            onClick={handleBack}
                            disabled={loading}
                        >
                            Quay lại
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}