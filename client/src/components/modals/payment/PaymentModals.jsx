import React, { useState } from "react";
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createOrderDetails, placeOrder } from "@/hooks/orderAPI";
import { useCart } from "@/components/context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/context/AuthContext";
import { removeAllCartDetails } from "@/hooks/cartAPI";

export const VisaModal = ({ orderData, totalPrice }) => {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setOrderOpen(true);

        try {
            const res = await placeOrder(orderData);
            
            const orderDetails = cartItems.map((item) => ({
                quantity: item.quantity,
                subtotal: item.item_subtotal,
                is_ground: item.grind,
                order_id: res.newOrder.order_id,
                pw_id: item.pw_id,
            }))

            const details = await createOrderDetails(orderDetails);
            const removeItems = await removeAllCartDetails(user.cart_id);
            if (details.success && removeItems.success) {
                setOrderOpen(true);
                localStorage.removeItem('cart');

                setTimeout(() => {
                    setOrderOpen(false);
                    navigate('/')
                }, 3000)
            }
            console.log(details);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='bg-crimsonRed text-ivory border-2 border-crimsonRed hover:bg-ivory hover:text-crimsonRed ml-auto'>
                        Đặt hàng
                    </Button>
                </DialogTrigger>

                <DialogContent className='bg-ivory'>
                    <DialogHeader>
                        <DialogTitle>Thanh toán</DialogTitle>
                        <DialogDescription className='text-base text-black'>

                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
                        <div className="space-y-4">
                            <article className='flex gap-4 w-full'>
                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="name">Tổng cộng</Label>
                                    <Input 
                                        id="name" name="name" 
                                        className='border-darkOlive' 
                                        defaultValue={totalPrice + ' vnđ'}
                                        disabled
                                    />
                                </div>

                                <div className="grid gap-2 w-1/2">
                                    <Label htmlFor="name">Tên chủ thẻ</Label>
                                    <Input 
                                        id="name" name="name" 
                                        className='border-darkOlive' 
                                        // onChange={(e) => setFirstName(e.target.value)}
                                        required 
                                    />
                                </div>
                            </article>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Số thẻ</Label>
                                <Input 
                                    id="address" name="address" 
                                    className='border-darkOlive' 
                                    // onChange={(e) => setAddressLine(e.target.value)}
                                    required 
                                />
                            </div>
                            
                            <div className="grid gap-2 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="month">Hạn sử dụng</Label>
                                    <div className="flex w-full gap-1">
                                        <Input 
                                            id="month" name="month" 
                                            className='border-darkOlive w-2/5' 
                                            placeHolder='Tháng'
                                            required 
                                        />
                                        <p className="self-center">/</p>
                                        <Input 
                                            id="year" name="year" 
                                            className='border-darkOlive w-3/5' 
                                            placeHolder='Năm'                               
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="state">CVV</Label>
                                    <Input 
                                        id="state" name="state" 
                                        className='border-darkOlive' 
                                        // onChange={(e) => setDistict(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-darkOlive text-ivory">
                            Thanh toán
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
                <DialogContent>
                    <div className="flex">
                        <CheckCircle2 className="mx-auto" size={80} color="green" />
                    </div>
                    <span className="text-xl mx-auto font-bold">
                        Đặt hàng thành công
                    </span>
                    <span className="mx-auto -mt-4">
                        Trở về trang chủ trong giây lát...
                    </span>
                </DialogContent>
            </Dialog>
        </>
    )
}

export const TransferModal = () => {
    return (
        <div></div>
    )
}