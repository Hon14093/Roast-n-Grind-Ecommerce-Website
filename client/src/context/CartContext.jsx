// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getCartDetailsByCartId, addCartDetails } from '@/hooks/cartAPI';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth(); // cart_id, account_id, is_admin
    const [cartItems, setCartItems] = useState([]);
    const [load, reload] = useState();
    let check = 0;

    // example data from api
    // {
    //     "cd_id": "78795726-dbaa-4f8b-aaf8-2e1aaac04108",
    //     "cart_id": "c4ce32a8-16e0-4086-b57e-4f2c4c4d4404",
    //     "item_subtotal": 50000,
    //     "product_id": "1810f4b8-880e-4784-a800-0836048a0628",
    //     "pw_id": "5b3e2302-f43a-4d9b-b894-572fa16a7276",
    //     "product_name": "Flight Seasonal Espresso",
    //     "weight_id": "500g",
    //     "price": 50000,
    //     "image_url": "https://res.cloudinary.com/dwuszt3qn/image/upload/v1741354590/aghzpy6fq9ahumxultuh.avif",
    //     "grind": false,
    //     "quantity": 1
    // },

    // useEffect(() => {
    //     const fetchCart = async () => {
    //         try {
    //             let savedCart ;
    //             var itemsInDB = [];

    //             // if user is logged in, idea 1
    //             // else check the localstorage 
    //             if (user && user.account_id) {
    //                 // idea 1: fetch items from db and localstorage
    //                 // if there are items in local storage, update them in db
    //                 // else set them in localstorage as 'cart'
    //                 itemsInDB = await getCartDetailsByCartId(user.cart_id);
    //                 const temp = JSON.parse(localStorage.getItem("cart")).items;
    //                 console.log('Items in cart: ', temp)
                    
    //                 if (temp) {
    //                     const cartDetailsData = temp.map(item => ({
    //                         cart_id: user.cart_id,
    //                         quantity: item.quantity,
    //                         pw_id: item.pw_id,
    //                         item_subtotal: item.price * item.quantity,
    //                         is_ground: item.grind
    //                     }));
            
    //                     await addCartDetails(cartDetailsData);
    //                     itemsInDB = await getCartDetailsByCartId(user.cart_id);
    //                     savedCart = itemsInDB;
    //                 } else {
    //                     savedCart = itemsInDB;
    //                 }

    //             } else {
    //                 // check the localStorage
    //                 savedCart = localStorage.getItem("cart");
    //                 console.log('Not logged in');
    //             }
    
    //             // this works
    //             if (typeof savedCart !== 'object') {
    //                 setCartItems(JSON.parse(savedCart).items);
    //                 console.log(typeof savedCart, savedCart)
    //             } else {
    //                 setCartItems(savedCart);
    //                 console.log(typeof savedCart, savedCart)
    //             }
    //         } catch (error) {
    //             console.error("Error fetching cart:", error);
    //         }
    //     };
    
    //     fetchCart();
        
    // }, [user]); 

    useEffect(() => {
        const fetchCart = async () => {
            try {
                let savedCart;
                let itemsInDB = [];
    
                if (user && user.account_id) {
                    // Fetch items from DB if logged in
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
                    // Fetch from localStorage if not logged in
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

    // Update localStorage when cartItems change
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
            console.log("Cart updated:", cartItems);
        }
    }, [cartItems]);

    const updateCart1 = (newItem) => {
        // const cartExist = JSON.parse(localStorage.getItem("cart")).items;
        // console.log('Checking', JSON.parse(cartExist))

        const existingItem = cartItems.find(
            (item) =>
                item.product_id === newItem.product_id &&
                item.weight_id === newItem.weight_id
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