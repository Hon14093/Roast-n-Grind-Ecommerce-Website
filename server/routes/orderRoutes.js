import express from "express";
import { 
    addOrder, 
    addOrderDetails, 
    returnAllOrders, 
    returnOrderDetailsByOrderId, 
    returnRemainingOrders, 
    returnUnprocessedOrders 
} from "../controllers/orderController.js";

const router = express.Router();

router.get('/all', returnAllOrders);
router.get('/details/all/:order_id', returnOrderDetailsByOrderId);
router.get('/unprocessed', returnUnprocessedOrders);
router.get('/processed', returnRemainingOrders)

router.post('/create', addOrder);
router.post('/details/create', addOrderDetails);


export default router;