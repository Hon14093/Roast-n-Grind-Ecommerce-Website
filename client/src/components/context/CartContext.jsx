// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Load cart items from localStorage on initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart).items);
        }
    }, []);

    // Update localStorage when cartItems change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify({ items: cartItems }));
    }, [cartItems]);

    const updateCart = (newItem) => {
        const existingItem = cartItems.find(
            (item) =>
                item.product_id === newItem.product_id &&
                item.weight_id === newItem.weight_id // Check for matching variation
        );
    
        if (existingItem) {
          // Update quantity if the variation already exists
            setCartItems((prev) =>
                prev.map((item) =>
                item.product_id === newItem.product_id &&
                item.weight_id === newItem.weight_id
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
                )
            );
        } else {
            setCartItems((prev) => [...prev, { ...newItem }]);
        }
    };

    const removeFromCart = (product_id, weight_id) => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                !(item.product_id === product_id && item.weight_id === weight_id)
            )
        );
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
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

    return (
        <CartContext.Provider 
            value={{ cartItems, updateCart, getTotalItems, updateQuantity, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}