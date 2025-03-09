import express from "express";
import { 
    returnCartByAccountId,
    addCartDetails
} from "../controllers/cartController.js";

const router = express.Router();

router.get('/:account_id', returnCartByAccountId);
router.post('/details/create', addCartDetails);

export default router;