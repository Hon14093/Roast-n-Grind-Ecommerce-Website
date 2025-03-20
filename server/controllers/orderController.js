import { createOrder, getAllOrders, getRemainingOrders, getUnprocessedOrders } from "../models/Order.js";
import { createOrderDetails, getOrderDetailsByOrderId } from "../models/Order_Details.js";

export const addOrder = async (req,res) => {
    try {
        const data = req.body;
        const newOrder = await createOrder(data);
        res.status(201).json({ 
            success: 1,
            message: 'Order created successfully',
            newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const addOrderDetails = async (req,res) => {
    try {
        const data = req.body;
        const newDetails = await createOrderDetails(data);

        res.status(201).json({ 
            success: 1,
            message: 'Order created successfully',
            newDetails
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnOrderDetailsByOrderId = async (req,res) => {
    try {
        const { order_id } = req.params;
        const details = await getOrderDetailsByOrderId(order_id);

        res.status(201).json({ details });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAllOrders = async (req,res) => {
    try {
        const orders = await getAllOrders();
        res.status(201).json({orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnUnprocessedOrders = async (req,res) => {
    try {
        const unprocessed = await getUnprocessedOrders();
        res.status(201).json({unprocessed});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnRemainingOrders = async (req,res) => {
    try {
        const remaining = await getRemainingOrders();
        res.status(201).json({remaining})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}