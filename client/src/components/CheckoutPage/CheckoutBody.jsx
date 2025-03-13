import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import logoBlack from '../../images/orange.png'
import AddressDetails from './AddressDetails'
import ChoosePayment from './ChoosePayment'
import OrderSummary from './OrderSummary'
import { useAuth } from '../context/AuthContext'

export default function CheckoutBody() {
    const [step, setStep] = useState(1);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [pm_id, setPm_id] = useState(null);

    const nextStep = () => { if (step < 3) setStep(step + 1); }
    const prevStep = () => { if (step > 1) setStep(step - 1); }

    return (
        <div className="p-4">
            <section className='grid grid-cols-12'>
                <article className='col-span-3'>
                    <a href="/">
                        <img src={logoBlack} className='w-24' />
                    </a>
                </article>

                {/* <CheckoutStepper step={step} nextStep={nextStep} prevStep={prevStep} /> */}

                <article className="w-full mx-auto col-span-6">
                    <div className="flex justify-between text-sm font-semibold">
                        <span className={step >= 1 ? "text-primary" : "text-gray-500"}>Địa chỉ giao hàng</span>
                        <span className={step >= 2 ? "text-primary" : "text-gray-500"}>Phương thức thanh toán</span>
                        <span className={step >= 3 ? "text-primary" : "text-gray-500"}>Tổng kết đơn hàng</span>
                    </div>
                    
                    <Progress value={(step / 3) * 100} className="my-3" />
                </article>
            </section>
            
    
            <div className="p-4 rounded-lg">
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
                    />
                }
            </div>
        </div>
    )
}
