import { X } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import { Input } from "../ui/input"
import { Trash2 } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { addCartDetails, removeCartDetail } from "@/hooks/cartAPI"
import { useNavigate } from "react-router-dom"

export default function Cart({ isOpen, toggleCart }) {
    const { user } = useAuth();
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = (cartItems && cartItems.length !== 0)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;
    
    const handleQuantityChange = (product_id, weight_id, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            updateQuantity(product_id, weight_id, newQuantity);
        }
    };
    
    const handleOrder = async () => {
        try {
            if (!user.cart_id) {
                alert("Vui lòng đăng nhập để đặt hàng!");
                return;
            }
            if (cartItems.length === 0) {
                alert("Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi đặt hàng.");
                return;
            }

            const cartDetailsData = cartItems.map(item => ({
                cart_id: user.cart_id,
                quantity: item.quantity,
                pw_id: item.pw_id,
                item_subtotal: item.price * item.quantity,
                is_ground: item.grind
            }));

            const response = await addCartDetails(cartDetailsData);
            if (response) {
                navigate('/checkout');
                console.log(response);
            }

        } catch (error) {
            console.log(error)
        }
    }

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
                                            {totalPrice.toLocaleString()} vnđ                                            
                                        </span>
                                    </article>
                                </div>

                                <button className="big-action-button w-full text-ivory" onClick={handleOrder}>
                                    Đặt hàng
                                </button>

                                <Separator className='bg-darkOlive h-[0.5px] mx-auto max-w-[80%]'/>

                                {(cartItems && cartItems.length > 0) ? (
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
                                                <p className="text-base">Thành tiền: {item.price.toLocaleString()} vnđ</p>
                                            </div>

                                            <div className="h-full ml-auto">
                                                <button 
                                                    onClick={() => {
                                                        removeFromCart(item.product_id, item.weight_id);
                                                        removeCartDetail(user.cart_id, item.pw_id);
                                                    }} 
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