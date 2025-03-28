
import React, { useState, useEffect } from "react";
import { Progress } from "../ui/progress";
import logoBlack from "../../images/orange.png";
import AddressDetails from "./AddressDetails";
import ChoosePayment from "./ChoosePayment";
import OrderSummary from "./OrderSummary";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function CheckoutBody() {
    const { user } = useAuth();
    const { cartItems } = useCart();
    const [step, setStep] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [pm_id, setPm_id] = useState(null);
    const [error, setError] = useState(null);

    const nextStep = () => {
        if (step === 1 && !selectedAddressId) {
            setError("Vui lòng chọn địa chỉ giao hàng trước khi tiếp tục.");
            return;
        }
        if (step === 2 && !pm_id) {
            setError("Vui lòng chọn phương thức thanh toán VNPAY.");
            return;
        }
        if (step < 3) setStep(step + 1);
        setError(null);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        setError(null);
    };

    useEffect(() => {
        if (!user?.account_id) {
            setError("Vui lòng đăng nhập để tiếp tục thanh toán.");
        } else if (cartItems.length === 0) {
            setError("Giỏ hàng trống, không thể tiếp tục thanh toán.");
        } else {
            setError(null);
        }
    }, [user, cartItems]);

    return (
        <div className="p-4">
            <section className="grid grid-cols-12">
                <article className="col-span-3">
                    <a href="/">
                        <img src={logoBlack} className="w-24" alt="Roast n Grind Logo" />
                    </a>
                </article>

                <article className="w-full mx-auto col-span-6">
                    <div className="flex justify-between text-sm font-semibold text-darkOlive">
                        <span className={step >= 1 ? "text-darkOlive" : "text-gray-500"}>Địa chỉ giao hàng</span>
                        <span className={step >= 2 ? "text-darkOlive" : "text-gray-500"}>Phương thức thanh toán</span>
                        <span className={step >= 3 ? "text-darkOlive" : "text-gray-500"}>Tổng kết đơn hàng</span>
                    </div>
                    <Progress value={(step / 3) * 100} className="my-3" />
                </article>
            </section>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="p-4 rounded-lg">
                {step === 1 && (
                    <AddressDetails
                        addressId={selectedAddressId}
                        setSelectedAddressId={setSelectedAddressId}
                        nextStep={nextStep}
                    />
                )}
                {step === 2 && (
                    <ChoosePayment
                        pm_id={pm_id}
                        setPm_id={setPm_id}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                )}
                {step === 3 && (
                    <OrderSummary
                        addressId={selectedAddressId}
                        pm_id={pm_id}
                        prevStep={prevStep}
                    />
                )}
            </div>
        </div>
    );
}