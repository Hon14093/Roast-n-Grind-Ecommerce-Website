import axios from 'axios';

export const addCartDetails = async (detail) => {
    try {
        const result = await axios.post('http://localhost:5000/api/cart/details/create', detail);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// this only returns cart_id and account_id
export const getCartByAccountId = async (account_id, setCart) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/cart/${account_id}`);
        setCart(result.data.cart);
        console.log('API: ', result);
        // return result.data.cart[0];
    } catch (error) {
        console.log(error);
    }
}

export const getCartDetailsByCartId = async (cart_id) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/cart/details/${cart_id}`);
        console.log('api cart details: ',result.data.formattedDetails);
        return result.data.formattedDetails;
    } catch (error) {
        console.log(error);
    }
}

export const removeCartDetail = async (cart_id, pw_id) => {
    try {
        const data = {
            cart_id: cart_id,
            pw_id: pw_id
        }
        console.log('delete data: ', data)
        const result = await axios.post('http://localhost:5000/api/cart/remove-detail', data)
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const removeAllCartDetails = async (cart_id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/api/cart/details/remove-all/${cart_id}`)
        return result.data;
    } catch (error) {
        console.log(error);
    }
}