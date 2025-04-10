import React, { useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom'
import { createOrderDetails, placeOrder } from '@/hooks/orderAPI';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { removeAllCartDetails } from '@/hooks/cartAPI';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const hasPlacedOrder = useRef(false)
    const navigate = useNavigate();

    

    useEffect(() => {
        const handlePlaceOrder = async () => {
            try {
                const orderData = JSON.parse(localStorage.getItem('orderData'));
                console.log(orderData);
                const res = await placeOrder(orderData);
    
                const orderDetails = cartItems.map((item) => ({
                    quantity: item.quantity,
                    subtotal: item.price * item.quantity,
                    is_ground: item.grind || false,
                    order_id: res.order_id,
                    pw_id: item.pw_id,
                }));
    
                const details = await createOrderDetails(orderDetails);
                const removeItems = await removeAllCartDetails(user.cart_id);
    
                if (details.success && removeItems.success) {
                    localStorage.removeItem('cart');
    
                    setTimeout(() => {
                        navigate('/');
                    }, 2000)
    
                    setTimeout(() => {
                        location.reload();
                    }, 2500)
                }
                console.log(details);
            } catch (error) {
                console.log(error);
            }
        }

        if (!hasPlacedOrder.current) {
            hasPlacedOrder.current = true;

            // optional delay
            setTimeout(() => {
                handlePlaceOrder();
            }, 2000);
        }
    }, [cartItems, navigate, user.cart_id])

    // setTimeout(() => {
    //     handlePlaceOrder();
    // }, 2000)

    return (
        <div class="flex flex-col items-center justify-center h-screen">
            <CheckCircle2 size={100} color="green" />
            <h1>Thanh toán thành công!</h1>
            <p>Session: {sessionId}</p>
        </div>
    )
}
