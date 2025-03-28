import { createReview, getReviewsByProductId } from "../models/Review.js"

export const addReview = async (req,res) => {
    try {
        const data = req.body;
        const newReview = await createReview(data);

        res.status(200).json({ newReview })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnReviewsByProductId = async (req,res) => {
    try {
        const { product_id } = req.params;
        const reviews = await getReviewsByProductId(product_id);

        res.status(200).json({ reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}