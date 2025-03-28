// components/CheckoutPage/OrderSummary.jsx
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { VNPayModal } from "../modals/payment/PaymentModals";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getAddressesByAccountId } from "@/hooks/addressAPI";

export default function OrderSummary({ addressId, pm_id, prevStep }) {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [note, setNote] = useState("");
    const [sm_id, setSm_id] = useState(1);
    const [shippingPrice, setShippingPrice] = useState(20000);
    const [discount_id, setDiscount_id] = useState(null);

    const selectedAddress = addresses.find(address => address.Address.address_id === addressId);

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    const finalTotal = totalPrice + shippingPrice;

    useEffect(() => {
        if (user?.account_id) {
            getAddressesByAccountId(user.account_id, setAddresses);
        }
    }, [user]);

    const orderData = {
        order_total: finalTotal,
        note: note || "Đơn hàng từ checkout",
        account_id: user.account_id,
        shipping_id: sm_id,
        discount_id: discount_id,
        address_id: addressId,
        method_id: pm_id === "vnpay" ? 1 : null, // Giả định VNPAY là 1
        order_details: cartItems.map(item => ({
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
            is_ground: item.grind,
            pw_id: item.pw_id,
        })),
    };

    return (
        <div className="grid grid-cols-12 gap-4">
            {/* Order Summary */}
            <section className="col-start-2 col-span-6 mx-auto w-full">
                <h1 className="font-semibold uppercase text-2xl pb-2 text-darkOlive">Tổng kết đơn hàng</h1>
                <ScrollArea className="h-[400px]">
                    {cartItems.map((item) => (
                        <div
                            key={`${item.product_id}-${item.weight_id}`}
                            className="flex items-start gap-4 mb-4"
                        >
                            <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-28 h-28 object-cover rounded"
                            />
                            <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-base">Size: {item.weight_name}</p>
                                <span className="text-base">Số lượng: {item.quantity}</span>
                                <p className="text-base">Xay: {item.grind ? "Có" : "Không"}</p>
                                <p className="text-base">Thành tiền: {item.price * item.quantity} vnđ</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <Separator className="bg-darkOlive h-[0.5px] w-[75%] mb-4" />

                <div>
                    <article className="flex text-lg">
                        <span className="font-bold">Phí vận chuyển:</span>
                        <span className="ml-auto pr-3">{shippingPrice} vnđ</span>
                    </article>
                    <article className="flex text-lg">
                        <span className="font-bold">Voucher:</span>
                        <span className="ml-auto pr-3">{discount_id ? "- TBD" : "- 0 vnđ"}</span>
                    </article>
                    <article className="flex text-lg">
                        <span className="font-bold">Tổng tiền:</span>
                        <span className="ml-auto pr-3">{finalTotal} vnđ</span>
                    </article>
                </div>

                <div className="flex gap-4 pt-4">
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={prevStep}
                    >
                        Quay lại
                    </Button>
                    <VNPayModal orderData={orderData} totalPrice={finalTotal} />
                </div>
            </section>

            {/* Sidebar */}
            <section className="col-span-4 text-darkOlive">
                <article className="pb-2">
                    <h1 className="font-semibold uppercase text-2xl pb-2">Phương thức vận chuyển</h1>
                    <Separator className="bg-darkOlive w-[50%] mb-2" />
                    <RadioGroup defaultValue="slow" className="grid gap-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="slow"
                                id="slow"
                                onClick={() => {
                                    setSm_id(1);
                                    setShippingPrice(20000);
                                }}
                            />
                            <Label htmlFor="slow" className="text-base">Tiết kiệm</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="fast"
                                id="fast"
                                onClick={() => {
                                    setSm_id(2);
                                    setShippingPrice(40000);
                                }}
                            />
                            <Label htmlFor="fast" className="text-base">Hỏa tốc</Label>
                        </div>
                    </RadioGroup>
                </article>

                <article className="pb-2">
                    <h1 className="font-semibold uppercase text-2xl pb-2">Địa chỉ giao hàng</h1>
                    <Separator className="bg-darkOlive h-[0.5px] w-[50%] mb-2" />
                    {selectedAddress ? (
                        <div>
                            <p className="text-lg">{selectedAddress.Address.last_name} {selectedAddress.Address.first_name}</p>
                            <p className="text-lg">{selectedAddress.Address.address_line}</p>
                            <p className="text-lg">{selectedAddress.Address.ward}</p>
                            <p className="text-lg">{selectedAddress.Address.district}</p>
                        </div>
                    ) : (
                        <p>Không có dữ liệu</p>
                    )}
                </article>

                <article className="pb-2">
                    <h1 className="font-semibold uppercase text-2xl pb-2">Phương thức thanh toán</h1>
                    <Separator className="bg-darkOlive w-[50%] mb-2" />
                    <p className="text-lg">Phương thức: VNPAY</p>
                </article>

                <article className="pb-2">
                    <h1 className="font-semibold uppercase text-2xl pb-2">Voucher</h1>
                    <Separator className="bg-darkOlive w-[50%] mb-3" />
                    <div className="flex gap-1">
                        <Input
                            placeholder="Nhập mã voucher"
                            className="border-darkOlive border-2 w-3/4 text-lg"
                            onChange={(e) => setDiscount_id(e.target.value || null)}
                        />
                        <Button className="bg-darkOlive">Áp dụng</Button>
                    </div>
                </article>

                <article>
                    <h1 className="font-semibold uppercase text-2xl pb-2">Ghi chú</h1>
                    <Separator className="bg-darkOlive w-[50%] mb-3" />
                    <Textarea
                        className="border-darkOlive border-2"
                        placeholder="Hãy nhập ghi chú của bạn (nếu có)"
                        onChange={(e) => setNote(e.target.value)}
                    />
                </article>
            </section>
        </div>
    );
}