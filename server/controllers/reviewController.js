import { createReview, getReviewsByProductId } from "../models/Review.js"

export const addReview = async (req,res) => {
    try {
        const data = req.body;
        const newReview = await createReview(data);
        console.log(newReview)

        res.status(200).json({ 
            success: 1,
            newReview
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnReviewsByProductId = async (req,res) => {
    try {
        const { product_id } = req.params;
        const reviews = await getReviewsByProductId(product_id);

        const formattedReviews = reviews.map(review => ({
            review_id: review.review_id,
            rating: review.star,
            comment: review.comment,
            user: review.Account.account_name,
            date: new Date(review.review_date).toISOString().replace('T', ' ').split('.')[0]
        }))

        res.status(200).json({ formattedReviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
