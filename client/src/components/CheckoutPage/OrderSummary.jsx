import React, { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { useCart } from '../../context/CartContext';
import { getAddressesByAccountId } from '@/hooks/addressAPI';
import { useAuth } from '../../context/AuthContext';
// import { VisaModal } from '../modals/payment/PaymentModals';
import { getDiscountByCode } from '@/hooks/discountAPI';
import { placeOrder } from '@/hooks/orderAPI';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function OrderSummary({ addressId, pm_id, prevStep }) {
    const { cartItems } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);
    const [note, setNote] = useState(null);
    const [sm_id, setSm_id] = useState(1);
    const [shippingPrice, setShippingPrice] = useState(20000);
    const [discount_id, setDiscount_id] = useState(null);
    const [discountCode, setDiscountCode] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const selectedAddress = addresses.find(address => address.address_id === addressId);
    const totalPrice = (cartItems.length > 0)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    
    let orderData = {
        order_total: totalPrice + shippingPrice - discountAmount,
        note: note,
        account_id: user.account_id,
        shipping_id: sm_id,
        discount_id: discount_id,
        address_id: addressId,
        method_id: pm_id
    }

    useEffect(() => {
        getAddressesByAccountId(user.account_id ,setAddresses);
    }, [])

    const calculateDiscount = (minOrder, maxDiscount, value) => {
        if (totalPrice >= minOrder) {
            let discountAmount = totalPrice * value / 100;
            
            if (discountAmount > maxDiscount) {
                setDiscountAmount(maxDiscount);
            } else {
                setDiscountAmount(discountAmount);
            }

            toast("Mã giảm giá đã được áp dụng");
        } else {
            toast("Đơn hàng của bạn không đủ điều kiện để sử dụng mã giảm giá này");
        }
    }

    // try to find discount code in db
    // if found, set discount id and update orderData
    // else, notify user that the code is invalid
    const handleApplyDiscount = async () => {
        const discount = await getDiscountByCode(discountCode);

        if (discount) {
            setDiscount_id(discount.discount_id);
            orderData.discount_id = discount.discount_id;

            calculateDiscount(discount.min_order_amount, discount.max_discount_amount, discount.discount_value);
        } else {
            toast('Mã giảm giá không hợp lệ');
        }
    }

    const handlePayment = async () => {
        console.log(orderData)
        localStorage.setItem('orderData', JSON.stringify(orderData));

        try {
            const stripe = await loadStripe('pk_test_51RC0uAP2tCpSt8NrqLBhlp1RYdeEEetUWHrtYCjH8vAkOT3h4ZPZ1wr6lk79d4vFYzHqOhAmq727SxPHCziITbZo00ofyPJrwg');
            console.log('Processing payment...');

            const response = await axios.post('http://localhost:5000/api/payment/stripe/create-checkout-session',
                { items: cartItems },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const result = await stripe.redirectToCheckout({
                sessionId: response.data.id
            });
        
            if (result.error) {
                console.error('Stripe redirect error:', result.error);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handlePlaceOrder1 = async () => {
        
        setIsLoading(true);
        try {
            const res = await placeOrder(orderData);
            const order_id = res?.newOrder?.order_id;
            const orderDetails = cartItems.map(item => ({
                // product_id: item.product_id,
                // weight_id: item.weight_id,
                // quantity: item.quantity,
                // price: item.price,
                // product_name: item.product_name,

                quantity: item.quantity,
                subtotal: item.price * item.quantity,
                is_ground: item.grind,
                order_id: order_id,
                pw_id: item.pw_id,
            }))

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
            
            setTimeout(async () => {
                const response = await axios.post(
                    apiUrl,
                    {
                        userId: user.account_id,
                        cartItems: orderDetails,
                        sm_id,
                        addressId,
                        orderData,
                    },
                    {
                        withCredentials: true, // same as credentials: 'include' in fetch
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
    
                const data = response.data;
                if (data?.data?.paymentUrl) {
                    toast.success(redirectMessage);
                    localStorage.setItem('paymentSessionId', data.data.sessionId);
                    window.location.href = data.data.paymentUrl;
                } else {
                    throw new Error("Không nhận được URL thanh toán từ server.");
                }
            }, 500)

            // if (!response.ok) {
            //     throw new Error("Không thể tạo URL thanh toán");
            // }

            // const data = await response.json();
            // console.log(`Dữ liệu thanh toán từ Stripe:`, data);

            // if (data && data.data.paymentUrl) {
            //     toast.success(redirectMessage);
            //     localStorage.setItem('paymentSessionId', data.data.sessionId);
            //     window.location.href = data.data.paymentUrl;
            // } else {
            //     throw new Error("Không nhận được URL thanh toán từ server.");
            // }

        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            toast.error(error.message || "Không thể xử lý thanh toán. Vui lòng thử lại.");
        } finally {
            setIsLoading(false);
        }
    };

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
                                <p className="text-base">Thành tiền: {item.price.toLocaleString()} vnđ</p>
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
                            {shippingPrice.toLocaleString()} vnđ
                        </span>
                    </article>

                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Voucher:
                        </span>
                        <span className="ml-auto pr-3">
                            - {discountAmount.toLocaleString()} vnđ
                        </span>
                    </article>

                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Tổng tiền:
                        </span>
                        <span className="ml-auto pr-3">
                            {(totalPrice + shippingPrice - discountAmount).toLocaleString()} vnđ
                        </span>
                    </article>
                </div>

                <article className='flex pt-4'>
                    <Button className='' variant='secondary' onClick={prevStep}>Quay lại</Button>
                    {/* <Button className='bg-crimsonRed text-ivory border-2 border-crimsonRed hover:bg-ivory hover:text-crimsonRed ml-auto'>
                        Đặt hàng
                    </Button> */}

                    {/* <Button
                        onClick={handlePayment}
                        className="w-full bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-3 rounded-lg transition-colors"
                        // disabled={isLoading || cartItems.length === 0 || !pm_id}
                    >
                        {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                        Đặt hàng
                    </Button> */}

                    <Button 
                        onClick={handlePayment}
                        className='bg-crimsonRed text-ivory border-2 border-crimsonRed hover:bg-ivory hover:text-crimsonRed ml-auto'
                    >
                        Đặt hàng
                    </Button>

                    {/* <VisaModal orderData={orderData} totalPrice={totalPrice} /> */}
                </article>
            </section>

            <section className='col-span-4 text-darkOlive'>
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

                        <div className="flex items-center space-x-2 ">
                            <RadioGroupItem value="fast" id="fast" onClick={() => {
                                setSm_id(2);
                                setShippingPrice(40000);
                            }} />
                            <Label htmlFor="fast" className='text-base'>
                                Hỏa tốc
                            </Label>
                        </div>
                    </RadioGroup>   
                </article>

                <article className='pb-2'>
                    <h1 className='font-semibold uppercase text-2xl pb-2'>Địa chỉ giao hàng</h1>
                    <Separator className='bg-darkOlive h-[0.5px] w-[50%] mb-2'/>

                    <div>
                        {selectedAddress ? (
                            <div>
                                <p className='text-lg'>{selectedAddress.last_name} {selectedAddress.first_name}</p>
                                <p className='text-lg'>{selectedAddress.address_line}</p>
                                <p className='text-lg'>{selectedAddress.ward}</p>
                                <p className='text-lg'>{selectedAddress.district}</p>
                            </div>
                        ) : (
                            <p>Không có dữ liệu</p>
                        )}
                    </div>
                </article>

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
                        <Input 
                            className='border-darkOlive border-2 w-3/4 text-lg'
                            placeholder='Nhập mã voucher' 
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <Button className='bg-darkOlive' onClick={() => handleApplyDiscount()}>
                            Áp dụng
                        </Button>
                    </div>
                </article>

                <article>
                    <h1 className='font-semibold uppercase text-2xl pb-2'>Ghi chú</h1>
                    <Separator className='bg-darkOlive w-[50%] mb-3'/>

                    <Textarea 
                        className='border-darkOlive border-2' 
                        placeholder="Hãy nhập ghi chú của bạn (nếu có)" 
                        onChange={(e) => setNote(e.target.value)}
                    />
                </article>

            </section>
        </div>
    )
}