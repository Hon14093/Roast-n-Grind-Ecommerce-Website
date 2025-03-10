import express from "express";
import { 
    returnCartByAccountId,
    returnCartDetailsByCartId,
    addCartDetails,
    removeCartDetail
} from "../controllers/cartController.js";

const router = express.Router();

router.get('/:account_id', returnCartByAccountId);
router.get('/details/:cart_id', returnCartDetailsByCartId);

router.post('/details/create', addCartDetails);
router.post('/remove-detail', removeCartDetail);

export default router;