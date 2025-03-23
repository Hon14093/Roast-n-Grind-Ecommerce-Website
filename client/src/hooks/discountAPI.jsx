import axios from "axios";

export const createDiscount = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/api/discount/create', data)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllDiscounts = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/discount/all');
        setData(result.data.discounts);
    } catch (error) {
        console.log(error);
    }
}

export const updateDiscount = async (discount_id, data) => {
    try {
        const result = await axios.put(`http://localhost:5000/api/discount/update/${discount_id}`, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}