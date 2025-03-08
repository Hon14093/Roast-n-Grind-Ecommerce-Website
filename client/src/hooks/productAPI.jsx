import axios from 'axios';

export const getProductData = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/details');
        console.log(result.data.products);
        setData(result.data.products);
        // return result.data.products;
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
}

export const getDetailedVariations = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/detailed-variations');
        setData(result.data.formattedProducts);
        console.log(result.data.formattedProducts);
    } catch (error) {
        console.log('Error fecthing variations:', error);
    }
}

export const addProduct = async (product) => {
    try {
        const result = await axios.post('http://localhost:5000/api/products/create', product);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const addProductVariation = async (variation) => {
    try {
        const result = await axios.post('http://localhost:5000/api/products/create-variation', variation);
        return result;
    } catch (error) {
        console.log(error);
    }
}


export const editProduct = async (product_id, data) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/products/update/${product_id}`, data);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (product_id) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/products/delete/${product_id}`)
        return result;
    } catch (error) {
        console.log(error);
        
    }
}

// Aroma ------------------------------
export const getAromas = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/aromas');
        setData(result.data.aromas);
    } catch (error) {
        console.error("Error fetching aroma data:", error); 
    }
}

// Product Type ------------------------------
export const getTypes = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/types');
        setData(result.data.types);
    } catch (error) {
        console.error("Error fetching type data:", error); 
    }
}

// Weight Options ------------------------------
export const getWeights = async (setWeight) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/weights');
        setWeight(result.data.options);
        console.log(result.data.options);
    } catch (error) {
        console.error("Error fetching weight data:", error); 
    }
}

export const getAllVariations = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/variations');
        setData(result.data.variations);
        console.log(result.data.variations);
    } catch (error) {
        console.log('Error fecthing variations:', error);
    }
}

export const editVariation = async (pw_id, data) => {
    try {
        console.log(data)
        const result = await axios.put(`http://localhost:5000/api/products/variations/update/${pw_id}`, data);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Roast Level ------------------------------
export const getRoastLevels = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/roasts');
        setData(result.data.roastLevels);
    } catch (error) {
        console.error("Error fetching roast level data:", error); 
    }
}
//Order ............................................
export const getAllOrders = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/orders');
        console.log("All orders:", result.data.orders);
        setData(result.data.orders); // Giả sử API trả về { orders: [...] }
    } catch (error) {
        console.error("Error fetching all orders:", error);
    }
};
export const getOrdersData = async (order_id, setData) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/orders/${order_id}`);
        setData(result.data.order);
    } catch (error) {
        console.error("Error fetching order details:", error);
    }
}
export const updateOrderStatus = async (order_id, status) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/orders/update/${order_id}`, {status});
        return result;
    } catch (error) {
        console.error("Error updating order status:", error);
    }
}
export const deleteOrder = async (order_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/orders/delete/${order_id}`);
        return result;
    } catch (error) {
        console.error("Error deleting order:", error);
    }
}
// User ............................................
export const getUsers = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/users');
        setData(result.data.users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}
export const deleteUser = async (user_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/users/delete/${user_id}`);
        return result;
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}
export const updateUserRole = async (user_id, role) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/users/update/${user_id}`, {role});
        return result;
    } catch (error) {
        console.error("Error updating user role:", error);
    }
}
// Auth ............................................
export const login = async (credentials) => {
    try {
        const result = await axios.post('http://localhost:5000/api/auth/login', credentials

        );
        return result;
    }
    catch (error) {
        console.error("Error logging in:", error);
    }
}
export const register = async (credentials) => {
    try {
        const result = await axios.post('http://localhost:5000/api/auth/register', credentials);
        return result;
    }
    catch (error) {
        console.error("Error registering:", error);
    }
}
export const getProfile = async (token) => {
    try {
        const result = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error fetching profile:", error);
    }
}
export const updateProfile = async (token, data) => {
    try {
        const result = await axios.put('http://localhost:5000/api/auth/update', data, {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error updating profile:", error);
    }
}
export const updatePassword = async (token, data) => {
    try {
        const result = await axios.put('http://localhost:5000/api/auth/update-password', data, {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error updating password:", error);
    }
}
// Cart ............................................
export const getCart = async (token) => {
    try {
        const result = await axios.get('http://localhost:5000/api/cart', {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error fetching cart:", error);
    }
}
export const addToCart = async (token, product) => {
    try {
        const result = await axios.post('http://localhost:5000/api/cart/add', product, {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error adding to cart:", error);
    }
}
export const removeFromCart = async (token, product_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/cart/remove/${product_id}`, {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error removing from cart:", error);
    }
}
export const clearCart = async (token) => {
    try {
        const result = await axios.delete('http://localhost:5000/api/cart/clear', {
            headers: {
                'x-auth-token': token
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error clearing cart:", error);
    }
}

