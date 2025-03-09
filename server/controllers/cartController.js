import { 
    createCartDetail,
    getCartDetailsByCartId,
} from "../models/Cart_Details.js";

import {
    getShoppingCartByUserId
} from "../models/Shopping_Cart.js"

export const addCartDetails = async (req,res) => {
    try {
        const data = req.body;
        console.log(data)
        if (!Array.isArray(data)) {
            return res.status(400).json({
                success: 0,
                message: "Invalid data format. Expected an array of cart details.",
            });
        }
        
        const newDetail = await createCartDetail(data);

        res.status(201).json({
            success: 1,
            message: 'Cart detail added successfully',
            new_detail: newDetail
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnCartByAccountId = async (req,res) => {
    try {
        const { account_id } = req.params;
        const cart = await getShoppingCartByUserId(account_id);
        res.status(201).json({
            success: 1,
            cart
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}