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

export const addProduct = async (product) => {
    try {
        
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
        
    } catch (error) {
        console.log(error);
        
    }
}