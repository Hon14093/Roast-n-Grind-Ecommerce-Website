import express from "express";
import { addDiscount, returnAllDiscounts } from "../controllers/discountController.js";

const router = express.Router();

router.get('/all', returnAllDiscounts);

router.post('/create', addDiscount);

export default router;