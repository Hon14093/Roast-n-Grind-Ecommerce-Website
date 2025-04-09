import { createOrder, 
    getAllOrders, 
    getOrdersByAccountId, 
    getRejectedOrders, 
    getRemainingOrders, 
    getUnprocessedOrders, 
    updateOrderStatus
} from "../models/Order.js";

import { 
    getOrderDetailsByOrderId 
} from "../models/Order_Details.js";
import { getAllOrderStatuses, getOrderStatusByName } from "../models/Order_Status.js";

export const createOrderDetails = async (req, res) => {
    try {
        const { orderDetails } = req.body; // Nhận mảng orderDetails từ body

        if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
            return res.status(400).json({ message: 'orderDetails không hợp lệ hoặc rỗng' });
        }

        // Kiểm tra và tạo Order_Details
        const createdDetails = await prisma.order_Details.createMany({
            data: orderDetails.map(detail => ({
                quantity: detail.quantity,
                subtotal: detail.subtotal,
                is_ground: detail.is_ground,
                order_id: detail.order_id,
                pw_id: detail.pw_id,
            })),
            skipDuplicates: true,
        });

        res.status(201).json({
            success: 1,
            message: 'Order_Details created successfully',
            createdDetails,
        });
    } catch (error) {
        console.error('Error creating Order_Details:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const addOrder = async (req, res) => {
    try {
        const result = await createOrder(req.body);
        res.json(result);
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng trong controller:", error);
        res.status(500).json({ 
            error: "Không thể tạo đơn hàng", 
            details: error.message || "Lỗi không xác định từ server" 
        });
    }
};

export const addOrderDetails = async (req,res) => {
    try {
        const data = req.body;
        console.log(data)
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

        res.status(200).json({ details });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAllOrders = async (req,res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json({orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnUnprocessedOrders = async (req,res) => {
    try {
        const unprocessed = await getUnprocessedOrders();
        res.status(200).json({unprocessed});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnRejectedOrders = async (req,res) => {
    try {
        const rejected = await getRejectedOrders();
        res.status(200).json({rejected});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// not sure if this will be used
export const returnRemainingOrders = async (req,res) => {
    try {
        const remaining = await getRemainingOrders();
        res.status(200).json({remaining});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnOrdersByAccountId = async (req,res) => {
    try {
        const { account_id } = req.params;
        const orders = await getOrdersByAccountId(account_id);
        res.status(200).json({orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editOrderStatus = async (req,res) => {
    try {
        const { order_id } = req.params;
        const { status_id } = req.body;
        
        const editedStatus = await updateOrderStatus(order_id, parseInt(status_id));

        res.status(200).json({
            success: 1,
            editedStatus
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



// get order statuses
export const returnOrderStatuses = async (req,res) => {
    try {
        const statuses = await getAllOrderStatuses();
        res.status(200).json({statuses});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}