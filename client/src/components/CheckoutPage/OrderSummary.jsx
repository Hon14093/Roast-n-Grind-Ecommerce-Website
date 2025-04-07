import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useCart } from '../../context/CartContext';
import { getAddressesByAccountId } from '@/hooks/addressAPI';
import { useAuth } from '../../context/AuthContext';
import { VisaModal } from '../modals/payment/PaymentModals';

export default function OrderSummary({ prevStep, addressId, shippingPrice: initialShippingPrice, sm_id }) {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const { pm_id } = usePayment();
    const [addresses, setAddresses] = useState([]);
    const [note, setNote] = useState(null);
    const [sm_id, setSm_id] = useState(1);
    const [shippingPrice, setShippingPrice] = useState(20000);
    const selectedAddress = addresses.find(address => address.Address.address_id === addressId);
    const [discount_id, setDiscount_id] = useState(null); // haven't figured out this one yet
    const totalPrice = (cartItems.length > 0)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    
    
    const orderData = {
        order_total: totalPrice + shippingPrice,
        note: note,
        account_id: user.account_id,
        shipping_id: sm_id,
        discount_id: discount_id,
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
        getAddressesByAccountId(user.account_id ,setAddresses);
    })

    return (
        <div className='grid grid-cols-12 gap-4'>
        
            <section className='col-start-2 col-span-6 mx-auto w-full'>
                <h1 className='font-semibold uppercase text-2xl pb-2'>Tổng kết đơn hàng</h1>
                <ScrollArea className='h-[400px]'>
                    
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
                                <p className="text-base">Thành tiền: {item.price}</p>
                            </div>
                        </div>
                    ))}

                </ScrollArea>

                <Separator className='bg-darkOlive h-[0.5px] w-[75%] mb-4'/>

                <div className=''>
                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Phí vận chuyển:
                        </span>
                        <span className="ml-auto pr-3">
                            {shippingPrice} vnđ
                        </span>
                    </article>

                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Voucher:
                        </span>
                        <span className="ml-auto pr-3">
                            {/* {totalPrice + shippingPrice} vnđ */}
                            - 0 vnđ
                        </span>
                    </article>

                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Tổng tiền:
                        </span>
                        <span className="ml-auto pr-3">
                            {totalPrice + shippingPrice} vnđ
                        </span>
                    </article>

                </div>

                <article className='flex pt-4'>
                    <Button className='' variant='secondary' onClick={prevStep}>Quay lại</Button>
                    {/* <Button className='bg-crimsonRed text-ivory border-2 border-crimsonRed hover:bg-ivory hover:text-crimsonRed ml-auto'>
                        Đặt hàng
                    </Button> */}

                    <VisaModal orderData={orderData} totalPrice={totalPrice} />
                </article>
            </section>

            <section className='col-span-4 text-darkOlive' onClick={() => console.log(addresses)}>
                <article className='pb-2'>
                    <h1 className='font-semibold uppercase text-2xl pb-2'>Phương thức vận chuyển</h1>
                    <Separator className='bg-darkOlive w-[50%] mb-2'/>

                    <RadioGroup defaultValue="slow" className='col-start-2 grid gap-2'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="slow" id="slow" onClick={() => {
                                setSm_id(1);
                                setShippingPrice(20000);
                            }} />
                            <Label htmlFor="slow" className='text-base flex gap-2'>
                                Tiết kiệm
                            </Label>
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

                <article className='pb-2'>
                    <h1 className='font-semibold uppercase text-2xl pb-2'>Phương thức thanh toán</h1>
                    <Separator className='bg-darkOlive w-[50%] mb-2'/>

                    {pm_id === 1 ? (
                        <p className='text-lg'>Phương thức: Chuyển khoản</p>
                    ) : (
                        <p className='text-lg'>Phương thức: Visa</p>
                    )}
                </article>

                <article className='pb-2'>
                    <h1 className='font-semibold uppercase text-2xl pb-2'>Voucher</h1>
                    <Separator className='bg-darkOlive w-[50%] mb-3'/>

                    <div className='flex gap-1'>
                        <Input placeholder='Nhập mã voucher' className='border-darkOlive border-2 w-3/4 text-lg'/>
                        <Button className='bg-darkOlive' onClick={() => console.log(orderData)}>
                            Áp dụng
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