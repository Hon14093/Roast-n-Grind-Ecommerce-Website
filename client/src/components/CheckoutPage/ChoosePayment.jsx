import React from 'react'
import { Button } from '../ui/button'
import { EditAddress, AddAddress, DeleteWarning } from '../modals/address/AddressModals'
import { useCart } from '../../context/CartContext'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { CreditCard } from 'lucide-react'
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import visaLogo from '../../images/visa.png'
import vnpayLogo from "../../images/vnpay.png";

export default function ChoosePayment({ pm_id, setPm_id, prevStep, nextStep }) {
    const { cartItems } = useCart();
    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const isPaymentChosen = () => {
        if (pm_id) {
            nextStep();
        } else {
            alert("Hãy chọn phương thức thanh toán");
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Payment Method Section */}
            <section className="md:col-span-7">
                <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">
                    Chọn phương thức thanh toán
                </h1>

                <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <RadioGroup 
                        value={pm_id === 1 ? "vnpay" : pm_id === 2 ? "visa" : ""}
                        onValueChange={(value) => setPm_id(value === "vnpay" ? 1 : 2)}
                        className="space-y-4"
                    >
                        <div className="flex items-center space-x-3 p-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
                            <RadioGroupItem value="vnpay" id="vnpay" className="border-darkOlive" />
                            <Label 
                                htmlFor="vnpay" 
                                className="flex items-center gap-3 text-gray-700 cursor-pointer text-lg font-medium"
                            >
                                <img src={vnpayLogo} alt="VNPAY" className="h-8 w-auto" />
                                VNPAY
                            </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 rounded-md hover:bg-gray-50 transition-colors duration-200">
                            <RadioGroupItem value="visa" id="visa" className="border-darkOlive" />
                            <Label 
                                htmlFor="visa" 
                                className="flex items-center gap-3 text-gray-700 cursor-pointer text-lg font-medium"
                            >
                                <img src={visaLogo} alt="Visa" className="h-8 w-auto" />
                                Visa
                            </Label>
                        </div>
                    </RadioGroup>
                </article>

                <div className="flex justify-between mt-6 gap-4">
                    <Button 
                        onClick={prevStep} 
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                    >
                        Quay lại
                    </Button>
                    <Button 
                        onClick={isPaymentChosen} 
                        className="w-full bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                    >
                        Tiếp theo
                    </Button>
                </div>
            </section>

            {/* Cart Section */}
            <section className="md:col-span-5">
                <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">
                    Giỏ hàng
                </h1>
                
                <ScrollArea className="h-[500px] bg-white rounded-lg border border-gray-200 p-4">
                    {cartItems.map((item) => (
                        <div
                            key={`${item.product_id}-${item.weight_id}`}
                            className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
                        >
                            <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">{item.product_name}</p>
                                <p className="text-sm text-gray-600">Size: {item.weight_name}</p>
                                <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                <p className="text-sm text-gray-600">
                                    Xay: {item.grind ? "Có" : "Không"}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {item.price.toLocaleString()} vnđ
                                </p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between text-lg">
                        <span className="font-bold text-gray-800">Tổng cộng:</span>
                        <span className="font-semibold text-darkOlive">
                            {totalPrice.toLocaleString()} vnđ
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
}