import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "../context/CartContext"

export default function Cart({ isOpen, toggleCart }) {
    // const [cartItems, setCartItems] = useState([]);

    // useEffect(() =>{
    //     const savedCart = localStorage.getItem('cart');
    //     if (savedCart) {
    //         setCartItems(JSON.parse(savedCart).items);
    //     }
    // }, [])

    const { cartItems } = useCart();

    return (
        <div className="relative w-full overflow-hidden z-[99]">
            {/* Backdrop when card is open */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300" onClick={toggleCart} />
            )}

            {/* Slide out card */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Card className="h-full rounded-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle className='text-4xl flex gap-4'>
                                <ShoppingCart size={40}/>
                                Giỏ hàng
                            </CardTitle>
                            {/* <CardDescription></CardDescription> */}
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleCart} className="h-8 w-8">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div
                                    key={`${item.product_id}-${item.weight_id}`}
                                    className="flex items-center gap-4 mb-4"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.product_name}
                                        className="w-16 h-16 object-cover rounded"
                                    />

                                    <div>
                                        <p className="font-medium">{item.product_name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.weight_name} - {item.quantity} x {item.price}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                        )}
                    </CardContent>

                    <CardFooter className="mt-auto border-t pt-4">
                        <Button onClick={toggleCart} className="w-full">
                            Close
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}