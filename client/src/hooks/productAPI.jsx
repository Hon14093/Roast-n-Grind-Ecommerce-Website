// hooks/productAPI.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";
const ORDER_URL = "http://localhost:5000/api/orders";

export const getProductData = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/details`);
        console.log("API getProductData:", result.data.products);
        return result.data.products || [];
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        throw error.response?.data || new Error("Không thể lấy dữ liệu sản phẩm.");
    }
};

export const getDetailedVariations = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/detailed-variations`);
        console.log("API getDetailedVariations:", result.data.formattedProducts);
        return result.data.formattedProducts || [];
    } catch (error) {
        console.error("Lỗi khi lấy biến thể chi tiết:", error);
        throw error.response?.data || new Error("Không thể lấy biến thể chi tiết.");
    }
};

export const addProduct = async (product) => {
    if (!product) throw new Error("Dữ liệu sản phẩm không hợp lệ.");
    try {
        const result = await axios.post(`${BASE_URL}/create`, product);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        throw error.response?.data || new Error("Không thể thêm sản phẩm.");
    }
};

export const addProductVariation = async (variation) => {
    if (!variation) throw new Error("Dữ liệu biến thể không hợp lệ.");
    try {
        const result = await axios.post(`${BASE_URL}/create-variation`, variation);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi thêm biến thể:", error);
        throw error.response?.data || new Error("Không thể thêm biến thể.");
    }
};

export const editProduct = async (product_id, data) => {
    if (!product_id || !data) throw new Error("Dữ liệu không hợp lệ.");
    try {
        const result = await axios.put(`${BASE_URL}/update/${product_id}`, data);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa sản phẩm:", error);
        throw error.response?.data || new Error("Không thể chỉnh sửa sản phẩm.");
    }
};

export const deleteProduct = async (product_id) => {
    if (!product_id) throw new Error("product_id không hợp lệ.");
    try {
        const result = await axios.delete(`${BASE_URL}/delete/${product_id}`);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        throw error.response?.data || new Error("Không thể xóa sản phẩm.");
    }
};

export const getAromas = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/aromas`);
        return result.data.aromas || [];
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hương vị:", error);
        throw error.response?.data || new Error("Không thể lấy dữ liệu hương vị.");
    }
};

export const getTypes = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/types`);
        return result.data.types || [];
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu loại sản phẩm:", error);
        throw error.response?.data || new Error("Không thể lấy dữ liệu loại sản phẩm.");
    }
};

export const getWeights = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/weights`);
        console.log("API getWeights:", result.data.options);
        return result.data.options || [];
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu trọng lượng:", error);
        throw error.response?.data || new Error("Không thể lấy dữ liệu trọng lượng.");
    }
};

export const getAllVariations = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/variations`);
        console.log("API getAllVariations:", result.data.variations);
        return result.data.variations || [];
    } catch (error) {
        console.error("Lỗi khi lấy tất cả biến thể:", error);
        throw error.response?.data || new Error("Không thể lấy tất cả biến thể.");
    }
};

export const editVariation = async (pw_id, data) => {
    if (!pw_id || !data) throw new Error("Dữ liệu không hợp lệ.");
    try {
        console.log("Dữ liệu chỉnh sửa biến thể:", data);
        const result = await axios.put(`${BASE_URL}/variations/update/${pw_id}`, data);
        return result.data;
    } catch (error) {
        console.error("Lỗi khi chỉnh sửa biến thể:", error);
        throw error.response?.data || new Error("Không thể chỉnh sửa biến thể.");
    }
};

export const getRoastLevels = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/roasts`);
        return result.data.roastLevels || [];
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu mức rang:", error);
        throw error.response?.data || new Error("Không thể lấy dữ liệu mức rang.");
    }
};

// Thêm createOrder
export const createOrder = async (orderData) => {
    if (!orderData || !orderData.account_id) throw new Error("Dữ liệu đơn hàng không hợp lệ.");
    try {
        const result = await axios.post(`${ORDER_URL}/create`, orderData);
        console.log("API createOrder:", result.data);
        return result.data; // Giả định trả về { order: { order_id: "xxx", ... } }
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        throw error.response?.data || new Error("Không thể tạo đơn hàng.");
    }
};