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

    return (
        <CartContext.Provider value={{ cartItems, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}