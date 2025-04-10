// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCartDetailsByCartId, addCartDetails } from '@/hooks/cartAPI';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth(); // cart_id, account_id, is_admin
    const [cartItems, setCartItems] = useState([]);
    const [load, reload] = useState();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                let savedCart;
                let itemsInDB = [];
    
                // if user is logged in, idea 1
                // else check the localstorage 
                if (user && user.account_id) {
                    // idea 1: fetch items from db and localStorage
                    // if there are items in localStorage, update them in db
                    // else set them in localstorage as 'cart'
                    itemsInDB = await getCartDetailsByCartId(user.cart_id);
                    const temp = JSON.parse(localStorage.getItem("cart"))?.items || [];
    
                    if (temp.length > 0) {
                        const cartDetailsData = temp.map(item => ({
                            cart_id: user.cart_id,
                            quantity: item.quantity,
                            pw_id: item.pw_id,
                            item_subtotal: item.price * item.quantity,
                            is_ground: item.grind
                        }));
    
                        await addCartDetails(cartDetailsData);
                        itemsInDB = await getCartDetailsByCartId(user.cart_id);
                    }
    
                    savedCart = itemsInDB;
                } else {
                    // fetch items from localStorage if not logged in
                    savedCart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
                }
    
                setCartItems(savedCart.items || savedCart); 
                console.log("Cart loaded:", savedCart);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
    
        fetchCart();
    }, [user]);

    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
            console.log("Cart updated:", cartItems);
        }
    }, [cartItems]);

    const updateCart = (newItem) => {
        setCartItems((prev = []) => {
            const existingItem = prev.find(
                (item) =>
                    item.product_id === newItem.product_id &&
                    item.weight_id === newItem.weight_id
            );
    
            if (existingItem) {
                return prev.map((item) =>
                    item.product_id === newItem.product_id &&
                    item.weight_id === newItem.weight_id
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prev, newItem];
            }
        });
    };

    const removeFromCart = (product_id, weight_id) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                !(item.product_id === product_id && item.weight_id === weight_id)
            )
        );
    };

    // this returns the number of items in cart, not total price
    const getTotalItems = () => {
        console.log('Total items', cartItems)
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    }

    const updateQuantity = (product_id, weight_id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product_id === product_id && item.weight_id === weight_id
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const data = {
        cartItems,
        load,
        reload,
        updateCart,
        getTotalItems,
        updateQuantity,
        removeFromCart,
    }

    return (
        <CartContext.Provider 
            value={ data }
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}