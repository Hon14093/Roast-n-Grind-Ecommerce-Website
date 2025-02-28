import express from 'express';
import { 
    returnAllProducts, 
    returnAllProductsDetails,
    updateProductInfo
} from '../controllers/productController.js';

const router = express.Router();

router.get('/details', returnAllProductsDetails);
router.get('/all', returnAllProducts);
router.put('/update/:product_id', updateProductInfo);


export default router;