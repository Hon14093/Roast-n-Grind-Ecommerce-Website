import React, { useEffect, useState, useCallback } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getAddressesByAccountId } from "@/hooks/addressAPI";
import { getAllDiscounts} from '@/hooks/discountAPI';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { createVNPayPaymentUrl, placeOrder } from '@/hooks/orderAPI';
import { toast } from "sonner";

export default function OrderSummary({ prevStep, addressId, pm_id }) {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [note, setNote] = useState("");
    const [sm_id, setSm_id] = useState(1);
    const [shippingPrice, setShippingPrice] = useState(20000);
    const [discountCode, setDiscountCode] = useState("");
    const [discount_id, setDiscount_id] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isAddressLoading, setIsAddressLoading] = useState(true);

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    const finalTotal = totalPrice + shippingPrice - discountAmount;

    const fetchAddresses = useCallback(async () => {
        if (!user?.account_id) return;
        
        setIsAddressLoading(true);
        try {
            await getAddressesByAccountId(user.account_id, setAddresses);
        } catch (error) {
            console.error("Lỗi khi lấy địa chỉ:", error);
            toast.error("Không thể lấy thông tin địa chỉ. Vui lòng thử lại sau.");
        } finally {
            setIsAddressLoading(false);
        }
    }, [user?.account_id]);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    useEffect(() => {
        if (addressId && addresses.length > 0) {
            const address = addresses.find(addr => addr.Address?.address_id === addressId);
            setSelectedAddress(address?.Address || null);
        }
    }, [addressId, addresses]);

    const calculateDiscount = (minOrder, maxDiscount, value) => {
        if (totalPrice >= minOrder) {
            let discount = totalPrice * value / 100;
            const finalDiscount = discount > maxDiscount ? maxDiscount : discount;
            setDiscountAmount(finalDiscount);
            toast.success("Mã giảm giá đã được áp dụng");
        } else {
            toast.error(`Đơn hàng của bạn không đủ điều kiện để sử dụng mã giảm giá này. Yêu cầu tối thiểu ${minOrder.toLocaleString()} vnđ`);
            setDiscountAmount(0);
            setDiscount_id(null);
        }
    };

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) {
            toast.error("Vui lòng nhập mã giảm giá");
            return;
        }
        
        setIsLoading(true);
        try {
            const discount = await getDiscountByCode(discountCode);
            if (discount) {
                setDiscount_id(discount.discount_id);
                calculateDiscount(discount.min_order_amount, discount.max_discount_amount, discount.discount_value);
            } else {
                toast.error("Mã giảm giá không hợp lệ hoặc đã hết hạn");
                setDiscountAmount(0);
                setDiscount_id(null);
            }
        } catch (error) {
            console.error("Lỗi khi áp dụng mã giảm giá:", error);
            toast.error("Không thể áp dụng mã giảm giá. Vui lòng thử lại sau.");
            setDiscountAmount(0);
            setDiscount_id(null);
        } finally {
            setIsLoading(false);
        }
    };

    const validateOrder = () => {
        if (!user?.account_id) {
            toast.error("Vui lòng đăng nhập để thanh toán.");
            return false;
        }
        
        if (cartItems.length === 0) {
            toast.error("Giỏ hàng trống, không thể thanh toán.");
            return false;
        }
        
        if (!addressId) {
            toast.error("Vui lòng chọn địa chỉ giao hàng.");
            return false;
        }
        
        if (!pm_id) {
            toast.error("Vui lòng chọn phương thức thanh toán.");
            return false;
        }

        return true;
    };

    const handlePlaceOrderClick = () => {
        if (validateOrder()) {
            setShowConfirm(true);
        }
    };

    const handlePlaceOrder = async () => {
        setShowConfirm(false);
        setIsLoading(true);

        try {
            if (pm_id === 1) { // VNPay
                const paymentData = await createVNPayPaymentUrl({
                    address_id: addressId,
                    discount_id: discount_id || null
                });
                
                if (paymentData && paymentData.paymentUrl) {
                    window.location.href = paymentData.paymentUrl;
                } else {
                    throw new Error("Không thể tạo URL thanh toán.");
                }
            } else if (pm_id === 2) { // Visa (COD hoặc phương thức khác)
                const orderData = {
                    address_id: addressId,
                    discount_id: discount_id || null,
                    shipping_id: sm_id,
                    shipping_cost: shippingPrice,
                    payment_method_id: pm_id,
                    note: note || null,
                    total_amount: finalTotal,
                    items: cartItems.map(item => ({
                        product_id: item.product_id,
                        weight_id: item.weight_id,
                        quantity: item.quantity,
                        item_subtotal: item.price * item.quantity,
                        is_ground: item.grind || false,
                    })),
                };
                
                const result = await placeOrder(orderData);
                if (result && result.order) {
                    toast.success("Đơn hàng đã được đặt thành công!");
                    clearCart();
                } else {
                    throw new Error("Không thể tạo đơn hàng.");
                }
            } else {
                throw new Error("Phương thức thanh toán không hợp lệ.");
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            toast.error(error.message || "Không thể xử lý thanh toán. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Order Summary */}
            <section className="md:col-span-7">
                <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">Tổng kết đơn hàng</h1>

                {/* Address */}
                {isAddressLoading ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-yellow-700">
                        Đang tải địa chỉ giao hàng...
                    </div>
                ) : selectedAddress ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Địa chỉ giao hàng</h2>
                        <p className="text-gray-700">{selectedAddress.last_name} {selectedAddress.first_name}</p>
                        <p className="text-gray-600">{selectedAddress.address_line}</p>
                        <p className="text-gray-600">{selectedAddress.ward}, {selectedAddress.district}, {selectedAddress.City?.city_name}</p>
                        <p className="text-gray-600">Mã bưu điện: {selectedAddress.postal_code}</p>
                        <p className="text-gray-600">Số điện thoại: {selectedAddress.phone_number}</p>
                    </div>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
                        Vui lòng chọn địa chỉ giao hàng
                    </div>
                )}

                {/* Cart Items */}
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
                                <img src={item.image_url} alt={item.product_name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-600">Size: {item.weight_name}</p>
                                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                    <p className="text-sm text-gray-600">Xay: {item.grind ? "Có" : "Không"}</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {(item.price * item.quantity).toLocaleString()} vnđ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                )}

                {/* Summary */}
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
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <Button
                        onClick={prevStep}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        Quay lại
                    </Button>
                    <Button
                        onClick={handlePlaceOrderClick}
                        className="w-full bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-3 rounded-lg transition-colors"
                        disabled={isLoading || cartItems.length === 0}
                    >
                        {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                    </Button>
                </div>
            </section>

            {/* Sidebar */}
            <section className="md:col-span-5 space-y-6">
                {/* Shipping Method */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức vận chuyển</h2>
                    <RadioGroup 
                        value={sm_id === 1 ? "slow" : "fast"} 
                        onValueChange={(value) => {
                            setSm_id(value === "slow" ? 1 : 2);
                            setShippingPrice(value === "slow" ? 20000 : 40000);
                        }}
                        disabled={isLoading}
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <RadioGroupItem value="slow" id="slow" />
                            <Label htmlFor="slow" className="text-gray-700 cursor-pointer">Tiết kiệm (20,000 vnđ)</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                            <RadioGroupItem value="fast" id="fast" />
                            <Label htmlFor="fast" className="text-gray-700 cursor-pointer">Hỏa tốc (40,000 vnđ)</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
                    <div className="p-3 border rounded-md bg-gray-50">
                        <p className="text-gray-700 font-medium">{pm_id === 1 ? "VNPay" : pm_id === 2 ? "Visa" : "Chưa chọn"}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {pm_id === 1 ? "Thanh toán trực tuyến qua VNPay" : pm_id === 2 ? "Thanh toán bằng thẻ Visa" : "Vui lòng chọn phương thức thanh toán"}
                        </p>
                    </div>
                </div>

                {/* Discount */}
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

                {/* Note */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Ghi chú</h2>
                    <Textarea
                        placeholder="Hãy nhập ghi chú của bạn (nếu có)"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border-gray-300 focus:border-darkOlive"
                        disabled={isLoading}
                        maxLength={200}
                    />
                    <p className="text-sm text-gray-500 mt-1">{note.length}/200 ký tự</p>
                </div>
            </section>

            {/* Modal Xác Nhận */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Xác nhận đặt hàng</h3>
                        <p className="text-gray-700 mb-6">
                            Bạn có chắc chắn muốn đặt đơn hàng với tổng tiền{" "}
                            <span className="font-bold text-darkOlive">{finalTotal.toLocaleString()} vnđ</span> không?
                        </p>
                        <div className="flex gap-4 justify-end">
                            <Button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={handlePlaceOrder}
                                className="bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                disabled={isLoading}
                            >
                                {isLoading ? "Đang xử lý..." : "Xác nhận"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}