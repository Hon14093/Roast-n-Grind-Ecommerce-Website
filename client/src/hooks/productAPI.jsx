import axios from 'axios';

export const getAllProduct = async () => {
    const getData = async (e) => {
        axios.get('http://localhost:5000/api/products/details')
        .then(result => {
            setData(result.data.products);
            console.log(result.data.products);
        })
        .catch(result => console.log(result))
    }
    
}

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