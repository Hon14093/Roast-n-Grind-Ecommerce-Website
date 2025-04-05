// OrderSummary.jsx
import React, { useEffect, useState, useCallback } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { usePayment } from "@/context/PaynmentContext";
import { getAddressesByAccountId } from "@/hooks/addressAPI";
import { toast } from "sonner";
import axios from "axios";

export default function OrderSummary({ prevStep, addressId, shippingPrice: initialShippingPrice, sm_id }) {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const { pm_id } = usePayment();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [note, setNote] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddressLoading, setIsAddressLoading] = useState(true);
    const [shippingOption, setShippingOption] = useState(sm_id || 1);
    const [shippingPrice, setShippingPrice] = useState(initialShippingPrice || 20000);

    console.log("OrderSummary pm_id:", pm_id);

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    const finalTotal = totalPrice + shippingPrice - discountAmount;

    const orderData = {
        address_id: addressId,
        shipping_id: shippingOption,
        note: note || null,
        discount_code: discountCode || null,
    };

    const fetchAddresses = useCallback(() => {
        if (!user?.account_id) return;

        setIsAddressLoading(true);
        getAddressesByAccountId(user.account_id, (fetchedAddresses) => {
            console.log("Fetched addresses:", fetchedAddresses);
            setAddresses(fetchedAddresses || []);
            if (addressId && fetchedAddresses && fetchedAddresses.length > 0) {
                const address = fetchedAddresses.find(addr => addr.address_id === addressId);
                setSelectedAddress(address || null);
                console.log("Selected address:", address);
            }
            setIsAddressLoading(false);
        });
    }, [user?.account_id, addressId]);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    const handleShippingChange = (option) => {
        setShippingOption(option);
        setShippingPrice(option === 1 ? 20000 : 40000);
        console.log("Selected shipping option:", option, "Price:", option === 1 ? 20000 : 40000);
    };

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            toast.error("Vui lòng nhập mã giảm giá");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/discount/apply',
                { discount_code: discountCode, total: totalPrice },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            const discount = response.data;
            if (discount && discount.discount_value) {
                const discountValue = Math.min(
                    totalPrice * (discount.discount_value / 100),
                    discount.max_discount_amount || Infinity
                );
                setDiscountAmount(discountValue);
                toast.success("Mã giảm giá đã được áp dụng");
            } else {
                toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn");
                setDiscountAmount(0);
                setDiscountCode("");
            }
        } catch (error) {
            console.error("Lỗi khi áp dụng mã giảm giá:", error);
            toast.error(error.response?.data?.error || "Không thể áp dụng mã giảm giá. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!user?.account_id) {
            toast.error("Vui lòng đăng nhập để thanh toán.");
            return;
        }
        if (cartItems.length === 0) {
            toast.error("Giỏ hàng trống, không thể thanh toán.");
            return;
        }
        if (!addressId) {
            toast.error("Vui lòng chọn địa chỉ giao hàng.");
            return;
        }
        if (!pm_id) {
            toast.error("Vui lòng chọn phương thức thanh toán.");
            return;
        }

        setIsLoading(true);
        try {
            let apiUrl = '';
            let redirectMessage = '';

            console.log("user.account_id:", user.account_id);

            if (pm_id === 2) {
                apiUrl = `http://localhost:5000/api/payment/stripe/create-checkout-session`;
                redirectMessage = "Đang chuyển hướng đến Stripe...";
            } else {
                throw new Error("Phương thức thanh toán không hợp lệ.");
            }

            console.log(`Dữ liệu gửi lên Stripe:`, orderData);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    userId: user.account_id,
                    cartItems: cartItems.map(item => ({
                        product_id: item.product_id,
                        weight_id: item.weight_id,
                        quantity: item.quantity,
                        price: item.price,
                        product_name: item.product_name,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error("Không thể tạo URL thanh toán");
            }

            const data = await response.json();
            console.log(`Dữ liệu thanh toán từ Stripe:`, data);

            if (data && data.data.paymentUrl) {
                toast.success(redirectMessage);
                // Lưu sessionId vào localStorage để sử dụng sau khi thanh toán
                localStorage.setItem('paymentSessionId', data.data.sessionId);
                // Chuyển hướng tab hiện tại đến giao diện thanh toán Stripe
                window.location.href = data.data.paymentUrl;
            } else {
                throw new Error("Không nhận được URL thanh toán từ server.");
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            toast.error(error.message || "Không thể xử lý thanh toán. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <section className="md:col-span-7">
                <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">Tổng kết đơn hàng</h1>

                {isAddressLoading ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-yellow-700">
                        Đang tải địa chỉ giao hàng...
                    </div>
                ) : selectedAddress ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Địa chỉ giao hàng</h2>
                        <p className="text-gray-700">{selectedAddress.Address.last_name} {selectedAddress.Address.first_name}</p>
                        <p className="text-gray-600">{selectedAddress.Address.address_line}</p>
                        <p className="text-gray-600">{selectedAddress.Address.ward}, {selectedAddress.Address.district}, {selectedAddress.Address.City?.city_name || "Không xác định"}</p>
                        <p className="text-gray-600">Mã bưu điện: {selectedAddress.Address.postal_code}</p>
                    </div>
                ) : (
                    <div className="bg-red-50 border border-yellow-200 rounded-lg p-4 mb-6 text-yellow-700">
                        Vui lòng chọn địa chỉ giao hàng
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-yellow-700">
                        Giỏ hàng của bạn đang trống
                    </div>
                ) : (
                    <ScrollArea className="h-[400px] bg-white border border-gray-200 rounded-lg p-4 mb-6">
                        {cartItems.map((item) => (
                            <div
                                key={`${item.product_id}-${item.weight_id}`}
                                className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
                            >
                                <img 
                                    src={item.image_url || "https://via.placeholder.com/80"} 
                                    alt={item.product_name} 
                                    className="w-20 h-20 object-cover rounded-md" 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }}
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.product_name || "Sản phẩm không xác định"}</p>
                                    <p className="text-sm text-gray-600">Size: {item.weight_name || "N/A"}</p>
                                    <p className="text-sm text-gray-600">Số lượng: {item.quantity || 0}</p>
                                    <p className="text-sm text-gray-600">Xay: {item.grind ? "Có" : "Không"}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {(item.price * item.quantity).toLocaleString()} vnđ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                )}

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức giao hàng</h2>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="shipping"
                                value={1}
                                checked={shippingOption === 1}
                                onChange={() => handleShippingChange(1)}
                                disabled={isLoading}
                            />
                            Bình thường - 20.000 VNĐ
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="shipping"
                                value={2}
                                checked={shippingOption === 2}
                                onChange={() => handleShippingChange(2)}
                                disabled={isLoading}
                            />
                            Hỏa tốc - 40.000 VNĐ
                        </label>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="space-y-3 text-lg text-gray-800">
                        <div className="flex justify-between">
                            <span className="font-semibold">Tạm tính:</span>
                            <span>{totalPrice.toLocaleString()} vnđ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Phí vận chuyển:</span>
                            <span>{shippingPrice.toLocaleString()} vnđ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Giảm giá:</span>
                            <span>-{discountAmount.toLocaleString()} vnđ</span>
                        </div>
                        <Separator className="bg-gray-200" />
                        <div className="flex justify-between font-bold text-xl text-darkOlive">
                            <span>Tổng cộng:</span>
                            <span>{finalTotal.toLocaleString()} vnđ</span>
                        </div>
                        <div className="flex justify-between text-lg text-gray-800 mt-2">
                            <span className="font-semibold">Phương thức thanh toán:</span>
                            <span>{pm_id === 2 ? "Stripe (Visa)" : "Chưa chọn"}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <Button
                        onClick={prevStep}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        Quay lại
                    </Button>
                    <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-3 rounded-lg transition-colors"
                        disabled={isLoading || cartItems.length === 0 || !pm_id}
                    >
                        {isLoading ? "Đang xử lý..." : `Đặt hàng qua ${pm_id === 2 ? "Stripe" : "..."}`}
                    </Button>
                </div>
            </section>

            <section className="md:col-span-5 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Mã giảm giá</h2>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nhập mã giảm giá"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="border-gray-300 focus:border-darkOlive"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleApplyDiscount}
                            className="bg-darkOlive hover:bg-darkOlive/90 text-white"
                            disabled={isLoading || !discountCode.trim()}
                        >
                            {isLoading ? "..." : "Áp dụng"}
                        </Button>
                    </div>
                    {discountAmount > 0 && (
                        <p className="text-green-600 text-sm mt-2">
                            Đã áp dụng giảm giá: -{discountAmount.toLocaleString()} vnđ
                        </p>
                    )}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú</h2>
                    <Textarea
                        placeholder="Hãy nhập ghi chú của bạn (nếu có)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border-gray-300 focus:border-darkOlive"
                        maxLength={200}
                        disabled={isLoading}
                    />
                    <p className="text-sm text-gray-500 mt-1">{note.length}/200 ký tự</p>
                </div>
            </section>
        </div>
    );
}