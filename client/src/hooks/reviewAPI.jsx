import axios from "axios";

export const createReview = async (review) => {
    try {
        const result = await axios.post('http://localhost:5000/api/review/create', review);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}