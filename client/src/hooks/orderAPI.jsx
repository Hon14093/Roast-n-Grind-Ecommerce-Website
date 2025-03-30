import axios from "axios";

export const placeOrder = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/api/order/create', data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const createOrderDetails = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/api/order/details/create', data)
        console.log('Actual result: ', result)
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const getOrderData = async (setData) => {
    try {
        const orders = await axios.get('http://localhost:5000/api/order/all');
        // setData(orders.data.formatterdOrders)
        setData(orders.data.orders)
    } catch (error) {
        console.log(error)
    }
}

export const getOrderDetailsData = async (order_id, setData) => {
    try {
        const orderDetails = await axios.get(`http://localhost:5000/api/order/details/all/${order_id}`)
        setData(orderDetails.data.details)
    } catch (error) {
        console.log(error)
    }
}

export const getUnprocessedOrders = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/order/unprocessed');
        setData(result.data.unprocessed)
    } catch (error) {
        console.log(error)
    }
}

export const getProcessedOrders = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/order/processed');
        setData(result.data.remaining);
    } catch (error) {
        console.log(error)
    }
}

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
        console.log(error)
    }
}


export const updateOrderStatus = async (order_id, statusId) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/order/check/${order_id}`, { status_id: statusId });
        return result.data;
    } catch (error) {
        console.log(error)
    }
}

export const getAllOrderStatuses = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/order/status/all');
        setData(result.data.statuses);
    } catch (error) {
        console.log(error)
    }
}