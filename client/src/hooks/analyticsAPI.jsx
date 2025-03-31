import axios from "axios";

export const getAllStats = async (setData) => {
    try {
        const stats = await axios.get('http://localhost:5000/api/analytics/all');
        setData(stats.data.allStats);
        console.log('Stats', stats.data.allStats);
    } catch (error) {
        console.log(error);
    }
}

export const getPopularProducts = async (setPopularProducts) => {
    try {
        const result = await axios.get('http://localhost:5000/api/products/popular');
        setPopularProducts(result.data.sortedProducts);
        console.log(result.data.sortedProducts)
    } catch (error) {
        console.log(error);
    }
}

export const getMonthlyRevenues = async (setRevenues) => {
    try {
        const result = await axios.get('http://localhost:5000/api/analytics/revenues');
        setRevenues(result.data.revenues);
        console.log(result.data.revenues);
    } catch (error) {
        console.log(error);
    }
}