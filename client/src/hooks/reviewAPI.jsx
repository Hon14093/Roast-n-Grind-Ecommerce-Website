import axios from "axios";

export const createReview = async (review) => {
    try {
        const result = await axios.post('http://localhost:5000/api/review/create', review);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const getReviewsByProductId = async (product_id, setData, setRatingValues) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/review/product/${product_id}`);
        const reviews = result.data.formattedReviews;

        const ratingsCount = reviews.reduce(
            (acc, review) => {
                acc[review.rating] = (acc[review.rating] || 0) + 1;
                return acc;
            },
            { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        );

        setData(reviews);
        setRatingValues(ratingsCount);

        console.log(result.data.formattedReviews);
    } catch (error) {
        console.log(error);
    }
}