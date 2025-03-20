// hooks/cartAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/cart";

export const addCartDetails = async (detail) => {
    if (!detail || (Array.isArray(detail) && detail.length === 0)) {
        throw new Error("Dữ liệu chi tiết giỏ hàng không hợp lệ.");
    }
    try {
        const result = await axios.post(`${BASE_URL}/details/create`, detail);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi thêm chi tiết giỏ hàng:", error);
        throw error.response?.data || new Error("Không thể thêm chi tiết giỏ hàng.");
    }
};

export const getCartByAccountId = async (account_id) => {
    if (!account_id) {
        throw new Error("account_id không được để trống.");
    }
    try {
        const result = await axios.get(`${BASE_URL}/${account_id}`);
        console.log("API getCartByAccountId:", result.data);
        return result.data.cart;
    } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error);
        throw error.response?.data || new Error("Không thể lấy giỏ hàng.");
    }
};

export const getCartDetailsByCartId = async (cart_id) => {
    if (!cart_id) {
        throw new Error("cart_id không được để trống.");
    }
    try {
        const result = await axios.get(`${BASE_URL}/details/${cart_id}`);
        console.log("API getCartDetailsByCartId:", result.data.formattedDetails);
        return result.data.formattedDetails || [];
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết giỏ hàng:", error);
        throw error.response?.data || new Error("Không thể lấy chi tiết giỏ hàng.");
    }
};

export const removeCartDetail = async (cart_id, pw_id) => {
    if (!cart_id || !pw_id) {
        throw new Error("cart_id hoặc pw_id không được để trống.");
    }

    try {
        const data = { cart_id, pw_id };
        console.log("Dữ liệu xóa:", data);
        const result = await axios.post(`${BASE_URL}/remove-detail`, data);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi xóa chi tiết giỏ hàng:", error);
        throw error.response?.data || new Error("Không thể xóa chi tiết giỏ hàng.");
    }
};

export const updateCartDetail = async (cart_id, pw_id, quantity) => {
    if (!cart_id || !pw_id || quantity < 1) {
        throw new Error("Dữ liệu không hợp lệ.");
    }
    try {
        const data = { cart_id, pw_id, quantity };
        const result = await axios.put(`${BASE_URL}/details/update`, data);
        console.log("API updateCartDetail:", result.data);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật số lượng:", error);
        throw error.response?.data || new Error("Không thể cập nhật số lượng.");
    }
};




export const removeAllCartDetails = async (cart_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/cart/details/remove-all/${cart_id}`)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

