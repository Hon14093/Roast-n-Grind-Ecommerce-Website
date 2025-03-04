import express from 'express';
import { 
    returnAllProducts, 
    returnAllProductsDetails,
    addProduct,
    updateProductInfo,
    returnAllAromas,
    returnAllOptions,
    returnAllTypes,
    returnAllRoastLevels,
    returnAllProductVariations,
    returnDetailedVaritions
} from '../controllers/productController.js';

const router = express.Router();

router.get('/all', returnAllProducts);
router.get('/detailed-variations', returnDetailedVaritions) // return products with their weight options
router.get('/variations', returnAllProductVariations); // not sure
router.get('/details', returnAllProductsDetails);
router.get('/aromas', returnAllAromas);
router.get('/weights', returnAllOptions);
router.get('/types', returnAllTypes);
router.get('/roasts', returnAllRoastLevels);

router.post('/create', addProduct);

router.put('/update/:product_id', updateProductInfo);


export default router;