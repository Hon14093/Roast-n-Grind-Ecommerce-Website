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
export const getOrderDetails = async (order_id, setData) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/orders/details/${order_id}`);
        setData(result.data.details);
    } catch (error) {
        console.error("Error fetching order details:", error);
    }
}

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
export const createOrder = async (order) => {
    try {
        const result = await axios.post('http://localhost:5000/api/orders/create', order);
        return result.data.order; // Giả sử API trả về { order: {...} }
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Lấy danh sách trạng thái đơn hàng (Order_Status)
export const getOrderStatuses = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/orders/statuses');
        setData(result.data.statuses); // Giả sử API trả về { statuses: [...] }
    } catch (error) {
        console.error("Error fetching order statuses:", error);
    }
};
// Lấy danh sách phương thức vận chuyển (Shipping_Method)
export const getShippingMethods = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/orders/shipping-methods');
        setData(result.data.methods); // Giả sử API trả về { methods: [...] }
    } catch (error) {
        console.error("Error fetching shipping methods:", error);
    }
};

// Lấy danh sách tài khoản (Account)
export const getAccounts = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/accounts');
        setData(result.data.accounts); // Giả sử API trả về { accounts: [...] }
    } catch (error) {
        console.error("Error fetching accounts:", error);
    }
};
// Quản lý Order_Details
export const addOrderDetail = async (orderDetail) => {
    try {
        const result = await axios.post('http://localhost:5000/api/orders/details/create', orderDetail);
        return result.data.detail; // Giả sử API trả về { detail: {...} }
    } catch (error) {
        console.error("Error adding order detail:", error);
        throw error;
    }
};

export const updateOrderDetail = async (order_detail_id, data) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/orders/details/update/${order_detail_id}`, data);
        return result.data.detail;
    } catch (error) {
        console.error("Error updating order detail:", error);
        throw error;
    }
};
export const deleteOrderDetail = async (order_detail_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/orders/details/delete/${order_detail_id}`);
        return result;
        
    } catch (error) {
        console.error("Error deleting order detail:", error);
        throw error;
    }
};
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

//Discount ............................................
export const fetchDiscounts = async () => {
    try {
        const result = await axios.get('http://localhost:5000/api/discounts');
        return result.data.discounts;
    } catch (error) {
        console.error("Error fetching discounts:", error);
    }
}
export const createDiscount = async (discount) => {
    try {
        const result = await axios.post('http://localhost:5000/api/discounts/create', discount);
        return result.data.discount;
    } catch (error) {
        console.error("Error creating discount:", error);
    }
}
export const deleteDiscount = async (discount_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/discounts/delete/${discount_id}`);
        return result;
    } catch (error) {
        console.error("Error deleting discount:", error);
    }
}
export const updateDiscount = async (discount_id, data) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/discounts/update/${discount_id}`, data);
        return result;
    } catch (error) {
        console.error("Error updating discount:", error);
    }
}
