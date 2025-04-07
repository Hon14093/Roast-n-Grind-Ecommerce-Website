import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import logoBlack from '../../images/orange.png'
import AddressDetails from './AddressDetails'
import ChoosePayment from './ChoosePayment'
import OrderSummary from './OrderSummary'
import { Toaster } from '../ui/sonner';
import { useAuth } from '../../context/AuthContext'

export default function CheckoutBody() {
    const { user } = useAuth();
    // const { cartItems } = useCart();
    const [step, setStep] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [pm_id, setPm_id] = useState(null);
    const [error, setError] = useState(null);

    const nextStep = () => {
        if (step === 1 && !selectedAddressId) {
            setError("Vui lòng chọn địa chỉ giao hàng trước khi tiếp tục.");
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
        // } else if (cartItems.length === 0) {
        //     setError("Giỏ hàng trống, không thể tiếp tục thanh toán.");
        } else {
            setError(null);
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <header className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-8">
                    <div className="col-span-1 md:col-span-3">
                        <a href="/">
                            <img 
                                src={logoBlack} 
                                className="w-24 h-auto" 
                                alt="Roast n Grind Logo" 
                            />
                        </a>
                    </div>

                    <div className="col-span-1 md:col-span-9 w-full">
                        <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                            <span className={`${step >= 1 ? "text-darkOlive font-semibold" : "text-gray-400"} transition-colors duration-200`}>
                                Địa chỉ giao hàng
                            </span>
                            <span className={`${step >= 2 ? "text-darkOlive font-semibold" : "text-gray-400"} transition-colors duration-200`}>
                                Phương thức thanh toán
                            </span>
                            <span className={`${step >= 3 ? "text-darkOlive font-semibold" : "text-gray-400"} transition-colors duration-200`}>
                                Tổng kết đơn hàng
                            </span>
                        </div>
                        <Progress 
                            value={(step / 3) * 100}
                            className="mt-4 h-2 bg-gray-200"
                        />
                    </div>
                </header>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
                        {error}
                    </div>
                )}

                {/* Main Content */}
                <main className="bg-white rounded-lg shadow-sm p-6">
                    {step === 1 && 
                        <AddressDetails
                            addressId={selectedAddressId}
                            setSelectedAddressId={setSelectedAddressId}
                            nextStep={nextStep}
                        />}
                    {step === 2 && 
                        <ChoosePayment 
                            pm_id={pm_id}
                            setPm_id={setPm_id}
                            prevStep={prevStep}
                            nextStep={nextStep}
                        />}
            
                    {step === 3 && 
                        <OrderSummary 
                            addressId={selectedAddressId}
                            pm_id={pm_id}
                            prevStep={prevStep}
                        />}
                </main>
            </div>

            <Toaster />
        </div>
    );
}