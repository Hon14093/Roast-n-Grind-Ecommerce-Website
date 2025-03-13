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