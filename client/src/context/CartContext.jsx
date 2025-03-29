// CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCartDetailsByCartId, addCartDetails } from "@/hooks/cartAPI";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [load, reload] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                let savedCart = [];
                if (user && user.account_id && user.cart_id) {
                    const itemsInDB = await getCartDetailsByCartId(user.cart_id) || [];
                    const localCart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
                    const temp = localCart.items || [];
                    if (temp.length > 0) {
                        const cartDetailsData = temp.map(item => ({
                            cart_id: user.cart_id,
                            quantity: item.quantity,
                            pw_id: item.pw_id,
                            item_subtotal: item.price * item.quantity,
                            is_ground: item.grind
                        }));
                        await addCartDetails(cartDetailsData);
                        savedCart = await getCartDetailsByCartId(user.cart_id) || [];
                    } else {
                        savedCart = itemsInDB;
                    }
                } else {
                    const localCart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
                    savedCart = localCart.items;
                    console.log("Not logged in, using local cart:", savedCart);
                }
                setCartItems(savedCart);
                console.log("Cart items sau khi fetch:", savedCart);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setCartItems([]);
            }
        };
        fetchCart();
    }, [user, load]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
        console.log("Cart items cập nhật vào localStorage:", cartItems);
    }, [cartItems]);

    const updateCart = (newItem) => {
        if (!newItem || !newItem.product_id || !newItem.weight_id) {
            console.error("Invalid item:", newItem);
            return;
        }
        const updatedItems = cartItems ? [...cartItems] : [];
        const existingItemIndex = updatedItems.findIndex(
            (item) => item.product_id === newItem.product_id && item.weight_id === newItem.weight_id
        );
        if (existingItemIndex > -1) {
            updatedItems[existingItemIndex].quantity += newItem.quantity;
        } else {
            updatedItems.push({ ...newItem });
        }
        setCartItems(updatedItems);
    };

    const removeFromCart = (product_id, weight_id) => {
        if (!cartItems) return;
        setCartItems((prev) =>
            prev.filter((item) => !(item.product_id === product_id && item.weight_id === weight_id))
        );
    };

    const getTotalItems = () => {
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const updateQuantity = (product_id, weight_id, newQuantity) => {
        if (!cartItems) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.product_id === product_id && item.weight_id === weight_id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.setItem("cart", JSON.stringify({ items: [] }));
        console.log("Cart cleared");
    };

    const data = {
        cartItems,
        load,
        reload,
        updateCart,
        getTotalItems,
        updateQuantity,
        removeFromCart,
        setCartItems,
        clearCart, // Thêm hàm clearCart
    };

    return (
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}