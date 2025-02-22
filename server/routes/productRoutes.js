import express from 'express';
import { returnAllProducts, returnAllProductsDetails } from '../controllers/productController.js';

const router = express.Router();

router.get('/details', returnAllProductsDetails);

router.get('/all', returnAllProducts);

export default router;