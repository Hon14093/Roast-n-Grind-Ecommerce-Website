import { createOrder } from "../models/Order.js";
import { createOrderDetails } from "../models/Order_Details.js";

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
