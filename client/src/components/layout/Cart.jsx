import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "../context/CartContext"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import { Input } from "../ui/input"
import { Trash2 } from "lucide-react"

export default function Cart({ isOpen, toggleCart }) {
    const { cartItems, updateQuantity, removeFromCart } = useCart();

    const handleQuantityChange = (product_id, weight_id, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(product_id, weight_id, newQuantity);
        }
    };

    return (
        <div className="relative w-full overflow-hidden z-[99]">
            {/* Backdrop when card is open */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300" onClick={toggleCart} />
            )}

            {/* Slide out card */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full lg:w-[35%] transform transition-transform duration-300 ease-in-out  ${
                isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Card className="h-full rounded-none shadow-lg bg-ivory text-darkOlive">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className='text-4xl flex gap-4 font-ibm-plex'>
                                <ShoppingCart size={40}/>
                                Giỏ hàng
                            </CardTitle>
                            {/* <CardDescription></CardDescription> */}
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleCart} className="h-8 w-8 hover:bg-darkOlive hover:text-ivory">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </CardHeader>

                    <Separator className='bg-darkOlive mx-auto max-w-[80%]'/>

                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-[calc(100vh-100px)]"> 
                            <CardContent className="pt-5 grid gap-4 text-lg">
                                <div>
                                    <article className="flex">
                                        <span>
                                            Tổng tiền:
                                        </span>

                                        <span className="ml-auto">
                                            
                                        </span>
                                    </article>

                                    <article className="flex">
                                        <span>
                                            Phí vận chuyển:
                                        </span>

                                        <span className="ml-auto">
                                            20,000 vnđ
                                        </span>
                                    </article>
                                </div>

                                <button className="big-action-button w-full text-ivory">
                                    Đặt hàng
                                </button>

                                <Separator className='bg-darkOlive h-[0.5px] mx-auto max-w-[80%]'/>

                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
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
                                                <div className="text-base flex flex-nowrap gap-4 items-center">
                                                    <span className="w-[5rem]">Số lượng: </span>
                                                    <Input 
                                                        type="number" 
                                                        className='max-w-20 h-7 border border-darkOlive' 
                                                        value={item.quantity}
                                                        // onChange={handleQuantityChange}
                                                        onChange={(e) => handleQuantityChange(
                                                            item.product_id,
                                                            item.weight_id,
                                                            parseInt(e.target.value)
                                                        )}
                                                        min="1" max="10"
                                                    />
                                                </div>
                                                <p className="text-base">Xay: {item.grind ? "Có" : "Không"}</p>
                                                <p className="text-base">Price: {item.price}</p>
                                            </div>

                                            <div className="h-full ml-auto">
                                                <button 
                                                    onClick={() => removeFromCart(item.product_id, item.weight_id)} 
                                                    className="h-full my-auto">
                                                    <Trash2 size={25} className="text-crimsonRed" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Không có sản phẩm trong giỏ hàng.</p>
                                )}
                            </CardContent>
                        </ScrollArea>
                    </div>

                </Card>
            </div>
        </div>
    )
}