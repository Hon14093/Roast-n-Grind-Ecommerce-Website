// PaymentModals.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"; // Điều chỉnh đường dẫn nếu cần
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { placeOrder, createOrderDetails } from "@/hooks/orderAPI";
import { removeAllCartDetails } from "@/hooks/cartAPI";
import { createVNPayPaymentUrl } from "@/hooks/orderAPI"; 
import { useNavigate } from "react-router-dom";
// import QRCode from "qrcode.react";

export const VNPayModal = ({ orderData, totalPrice }) => {
    const { cartItems, setCartItems } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [error, setError] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!user?.account_id) {
            setError("Vui lòng đăng nhập để thanh toán.");
            setLoading(false);
            return;
        }
        if (cartItems.length === 0) {
            setError("Giỏ hàng trống, không thể thanh toán.");
            setLoading(false);
            return;
        }

        try {
            const orderResponse = await placeOrder(orderData);
            console.log("Đơn hàng đã được tạo:", orderResponse);

            if (!orderResponse || !orderResponse.order?.order_id) {
                throw new Error("Không thể tạo đơn hàng.");
            }

            const orderDetails = cartItems.map((item) => ({
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
                is_ground: item.grind,
                order_id: orderResponse.order.order_id,
                pw_id: item.pw_id,
            }));

            await createOrderDetails(orderDetails);

            const paymentData = await createVNPayPaymentUrl(
                totalPrice,
                orderResponse.order.order_id,
                `Thanh toán đơn hàng ${orderResponse.order.order_id}`
            );

            if (paymentData && paymentData.paymentUrl) {
                setPaymentUrl(paymentData.paymentUrl);
                await removeAllCartDetails(user.cart_id);
                setCartItems([]);
                setOrderOpen(true);
                // Không chuyển hướng ngay, để người dùng quét QR
            } else {
                setError("Không thể tạo URL thanh toán.");
            }
        } catch (err) {
            setError(err.message || "Không thể xử lý thanh toán.");
            console.error("Lỗi khi thanh toán:", err);
        }
        setLoading(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className="bg-crimsonRed text-ivory border-2 border-crimsonRed hover:bg-ivory hover:text-crimsonRed ml-auto">
                        Đặt hàng
                    </Button>
                </DialogTrigger>

                <DialogContent className="bg-ivory">
                    <DialogHeader>
                        <DialogTitle>Thanh toán qua VNPAY</DialogTitle>
                        <DialogDescription className="text-base text-black">
                            Vui lòng xác nhận thanh toán đơn hàng.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Tổng cộng</Label>
                                <Input
                                    className="border-darkOlive"
                                    value={`${totalPrice} vnđ`}
                                    disabled
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-darkOlive text-ivory" disabled={loading}>
                            {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thanh toán qua VNPAY</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <CheckCircle2 className="mx-auto" size={80} color="green" />
                        <p className="text-xl mx-auto font-bold">Đặt hàng thành công</p>
                        {paymentUrl ? (
                            <>
                                <p className="text-sm text-gray-600 text-center">
                                    Quét mã QR dưới đây để thanh toán qua VNPAY hoặc{" "}
                                    <a href={paymentUrl} className="text-blue-500 underline">
                                        nhấp vào đây
                                    </a>
                                    .
                                </p>
                                <div className="flex justify-center">
                                    <QRCode value={paymentUrl} size={200} />
                                </div>
                                <Button
                                    onClick={() => navigate("/account")}
                                    className="w-full bg-darkOlive text-ivory mt-4"
                                >
                                    Hoàn tất
                                </Button>
                            </>
                        ) : (
                            <p>Đang tạo URL thanh toán...</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};