import React, { useEffect, useState } from 'react'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import logoBlack from '../../images/orange.png'
import AddressDetails from './AddressDetails'
import { useAuth } from '../context/AuthContext'

export default function CheckoutBody() {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    
    
    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    }

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    }

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
                    
                    <Progress value={(step / 3) * 100} className="my-4" />
        
                    {/* <div className="mt-4 flex justify-between">
                        <Button onClick={prevStep} disabled={step === 1}>Back</Button>
                        <Button onClick={nextStep} disabled={step === 3}>Next</Button>
                    </div> */}
                </article>
            </section>
            
    
            <div className="p-4 rounded-lg">
                {step === 1 && 
                    <AddressDetails 
                        currentStep={step} 
                        nextStep={nextStep} 
                />}
                {step === 2 && <Button onClick={prevStep} disabled={step === 1}>Back</Button>}
                {step === 3 && <p>Review Your Order</p>}
            </div>
        </div>
    )
}
