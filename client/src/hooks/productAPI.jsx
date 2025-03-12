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

// used in shop page
export const getDetailedVariations = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/detailed-variations');
        setData(result.data.formattedProducts);
        console.log(result.data.formattedProducts);
    } catch (error) {
        console.log('Error fecthing variations:', error);
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

export const addProductVariation = async (variation) => {
    try {
        const result = await axios.post('http://localhost:5000/api/products/create-variation', variation);
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
        const result = await axios.put(`http://localhost:5000/api/products/delete/${product_id}`)
        return result;
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
export const getWeights = async (setWeight) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/weights');
        setWeight(result.data.options);
        console.log(result.data.options);
    } catch (error) {
        console.error("Error fetching weight data:", error); 
    }
}

export const getAllVariations = async (setData) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/variations');
        setData(result.data.variations);
        console.log(result.data.variations);
    } catch (error) {
        console.log('Error fecthing variations:', error);
    }
}

export const editVariation = async (pw_id, data) => {
    try {
        console.log(data)
        const result = await axios.put(`http://localhost:5000/api/products/variations/update/${pw_id}`, data);
        return result;
    } catch (error) {
        console.log(error);
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