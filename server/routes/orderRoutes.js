import express from "express";
import { addOrder, addOrderDetails, returnAllOrders, returnOrderDetailsByOrderId } from "../controllers/orderController.js";

const router = express.Router();

router.get('/all', returnAllOrders);
router.post('/create', addOrder);
router.post('/details/create', addOrderDetails);
router.get('/details/all/:order_id', returnOrderDetailsByOrderId);

export default router;