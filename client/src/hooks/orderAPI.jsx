// hooks/orderAPI.jsx
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const placeOrder = async (data) => {
    try {
        const result = await axios.post(`${BASE_URL}/api/order/create`, data);
        console.log("API placeOrder:", result.data);
        return result.data; // Trả về dữ liệu đơn hàng
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });
        throw error.response?.data || new Error("Không thể tạo đơn hàng trên server.");
    }
};

export const createOrderDetails = async (data) => {
    console.log('data in api:', data)
    try {
        const result = await axios.post(`${BASE_URL}/api/order/details/create`, data);
        console.log("Actual result: ", result.data);
        return result.data;
    } catch (error) {
        console.log("Lỗi khi tạo chi tiết đơn hàng:", error);
    }
};

export const getOrderData = async (setData) => {
    try {
        const orders = await axios.get(`${BASE_URL}/api/order/all`);
        console.log("API getOrderData:", orders.data.orders);
        setData(orders.data.orders); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy dữ liệu đơn hàng:", error);
    }
};

export const getOrderDetailsData = async (order_id, setData) => {
    try {
        const orderDetails = await axios.get(`${BASE_URL}/api/order/details/all/${order_id}`);
        console.log("API getOrderDetailsData:", orderDetails.data.details);
        setData(orderDetails.data.details); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
};

export const getUnprocessedOrders = async (setData) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/order/unprocessed`);
        console.log("API getUnprocessedOrders:", result.data.unprocessed);
        setData(result.data.unprocessed); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng chưa xử lý:", error);
    }
};

export const getRejectedOrders = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/order/rejected');
        setData(result.data.rejected);
    } catch (error) {
        console.log(error);
    }
}

export const getProcessedOrders = async (setData) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/order/processed`);
        console.log("API getProcessedOrders:", result.data.remaining);
        setData(result.data.remaining); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng đã xử lý:", error);
    }
};

export const getOrdersByAccountId = async (account_id, setProcessingOrders, setDeliveredOrders) => {
    try {

        const result = await axios.get(`http://localhost:5000/api/order/my-orders/${account_id}`);
        const allOrders = result.data.orders;

        // Filter orders into processing and delivered
        const delivered = allOrders.filter(order => order.status_id === 5);
        const processing = allOrders.filter(order => order.status_id !== 5);

        setDeliveredOrders(delivered);
        setProcessingOrders(processing);

    } catch (error) {
        console.log("Lỗi khi lấy đơn hàng theo account_id:", error);
    }
};

export const updateOrderStatus = async (order_id, statusId) => {
    try {
        const result = await axios.put(`${BASE_URL}/api/order/check/${order_id}`, { status_id: statusId });
        console.log("API updateOrderStatus:", result.data);
        return result.data; // Trả về dữ liệu đơn hàng đã cập nhật
    } catch (error) {
        console.log("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        return null;
    }
};

export const getAllOrderStatuses = async (setData) => {
    try {
        const result = await axios.get(`${BASE_URL}/api/order/status/all`);
        console.log("API getAllOrderStatuses:", result.data.statuses);
        setData(result.data.statuses); // Gọi setData để cập nhật state
    } catch (error) {
        console.log("Lỗi khi lấy danh sách trạng thái đơn hàng:", error);
    }
};

// hooks/orderAPI.jsx (trích đoạn createVNPayPaymentUrl)
export const createVNPayPaymentUrl = async (orderData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/payment/create_payment_url`,
            {
                address_id: orderData.address_id,
                shipping_id: orderData.shipping_id,
                note: orderData.note,
                discount_code: orderData.discount_code
            },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        console.log("API createVNPayPaymentUrl:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tạo URL thanh toán VNPAY:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error.response?.data || new Error("Không thể tạo URL thanh toán.");
    }
};