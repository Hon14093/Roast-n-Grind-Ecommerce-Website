import express from 'express';
import { 
    addReview, 
    returnReviewsByProductId
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/product/:product_id', returnReviewsByProductId)

router.post('/create', addReview);

export default router;