import express from 'express';
import { 
    returnAllProducts, 
    returnAllProductsDetails,
    addProduct,
    addProductVariation,
    updateProductInfo,
    updateVariation,
    returnAllAromas,
    returnAllOptions,
    returnAllTypes,
    returnAllRoastLevels,
    returnAllProductVariations,
    returnDetailedVaritions,
    deleteProductWithID,
    returnPopularProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/all', returnAllProducts);
router.get('/detailed-variations', returnDetailedVaritions) // return products with their weight options
router.get('/variations', returnAllProductVariations); // not sure
router.get('/details', returnAllProductsDetails); // admin page for products
router.get('/popular', returnPopularProducts);

router.get('/aromas', returnAllAromas);
router.get('/weights', returnAllOptions);
router.get('/types', returnAllTypes);
router.get('/roasts', returnAllRoastLevels);

router.post('/create', addProduct);
router.post('/create-variation', addProductVariation);

router.put('/delete/:product_id', deleteProductWithID);
router.put('/update/:product_id', updateProductInfo);
router.put('/variations/update/:pw_id', updateVariation);


export default router;