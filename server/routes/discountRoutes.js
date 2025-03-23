import express from "express";
import { 
    addDiscount, 
    editDiscount, 
    findDiscountByCode, 
    returnAllDiscounts 
} from "../controllers/discountController.js";

const router = express.Router();

router.get('/all', returnAllDiscounts);
router.get('/info/:discount_code', findDiscountByCode)

router.post('/create', addDiscount);

router.put('/update/:discount_id', editDiscount);

export default router;