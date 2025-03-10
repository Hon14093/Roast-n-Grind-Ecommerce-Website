import { data } from 'autoprefixer';
import axios from 'axios';

export const addCartDetails = async (detail) => {
    try {
        const result = await axios.post('http://localhost:5000/api/cart/details/create', detail);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getCartByAccountId = async (account_id) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/cart/${account_id}`);
        return result.data.cart[0];
    } catch (error) {
        console.log(error);
    }
}