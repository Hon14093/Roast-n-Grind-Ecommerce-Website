import express from "express";
import { 
    addOrder, 
    addOrderDetails, 
    editOrderStatus, 
    returnAllOrders, 
    returnOrderDetailsByOrderId, 
    returnOrdersByAccountId, 
    returnOrderStatuses, 
    returnRemainingOrders, 
    returnUnprocessedOrders 
} from "../controllers/orderController.js";

const router = express.Router();

router.get('/all', returnAllOrders);
router.get('/details/all/:order_id', returnOrderDetailsByOrderId);
router.get('/unprocessed', returnUnprocessedOrders);
router.get('/processed', returnRemainingOrders);
router.get('/status/all', returnOrderStatuses);
router.get('/my-orders/:account_id', returnOrdersByAccountId);

router.post('/create', addOrder);
router.post('/details/create', addOrderDetails);

router.put('/check/:order_id', editOrderStatus);


export default router;