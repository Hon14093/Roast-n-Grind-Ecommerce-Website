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
        const result = await axios.post('http://localhost:5000/api/products/create', product);
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
export const getWeights = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/weights');
        setData(result.data.weights);
    } catch (error) {
        console.error("Error fetching weight data:", error); 
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