import express from "express";
import { addOrder, addOrderDetails } from "../controllers/orderController.js";

const router = express.Router();

router.post('/create', addOrder);
router.post('/details/create', addOrderDetails);

export default router;