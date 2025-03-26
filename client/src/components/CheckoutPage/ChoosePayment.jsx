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

export default function ChoosePayment({ pm_id, setPm_id, prevStep, nextStep}) {
    const { cartItems } = useCart();
    const totalPrice = (cartItems.length > 0)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const isPaymentChosen = () => {
        if (pm_id) {
            nextStep();
        } else {
            alert('Hãy chọn phương thức thanh toán')
        }
    }

    return (
        <div className='grid grid-cols-12 gap-4'>
        
            <section className='col-span-7 mx-auto w-full'>
                <h1 className='font-semibold uppercase text-2xl pb-2'>Chọn phương thức thanh toán</h1>

                <article className='border-2 border-darkOlive min-h-36 rounded-lg grid grid-cols-4'>
                    <RadioGroup defaultValue="option-one" className='col-start-2 grid gap-6'>
                        <div className="flex items-center space-x-2 self-end">
                            <RadioGroupItem value="bank" id="bank" onClick={() => setPm_id(1)} />
                            <Label htmlFor="bank" className='text-base flex gap-2'>
                                <CreditCard />
                                Chuyển khoản
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 self-start">
                            <RadioGroupItem value="visa" id="visa" onClick={() => setPm_id(2)} />
                            <Label htmlFor="visa" className='text-base'>
                                <img src={visaLogo} alt="" className='h-6' />
                            </Label>
                        </div>
                    </RadioGroup>   

                </article>

                <article className='flex pt-4'>
                    <Button onClick={prevStep} className='bg-darkOlive'>Quay lại</Button>

                    <Button onClick={isPaymentChosen} className='ml-auto bg-darkOlive'>Tiếp theo</Button>

                </article>
            </section>

            {/* Display cart */}
            <section className='col-span-4 text-darkOlive' onClick={() => console.log(addresses)}>
                <h1 className='font-semibold uppercase text-2xl pb-2'>Giỏ hàng</h1>
                <ScrollArea className='h-[500px]'>
                    
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
                                <span className="text-base w-[5rem]">Số lượng: {item.quantity}</span>
                                <p className="text-base">Xay: {item.grind ? "Có" : "Không"}</p>
                                <p className="text-base">Thành tiền: {item.price.toLocaleString()} vnđ</p>
                            </div>
                        </div>
                    ))}

                </ScrollArea>

                <Separator className='bg-darkOlive h-[0.5px] w-[50%] mb-4'/>
                
                <div>
                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Thành tiền:
                        </span>
                        <span className="ml-auto pr-3">
                            {totalPrice.toLocaleString()} vnđ
                        </span>
                    </article>
                </div>

            </section>
        </div>
    )
}

