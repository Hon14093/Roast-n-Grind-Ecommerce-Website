import { 
    createCartDetail,
    getCartDetailsByCartId,
    deleteCartDetailByCartIdAndPwId,
    deleteCartDetailsByCartId
} from "../models/Cart_Details.js";

import {
    getShoppingCartByUserId
} from "../models/Shopping_Cart.js"
import { Prisma } from "@prisma/client";
const prisma = Prisma.PrismaClient;
export const addCartDetails = async (req,res) => {
    try {
        const data = req.body;
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

// CartController.js
export const returnCartDetailsByCartId = async (req, res) => {
    try {
        const { cart_id } = req.params;
        const details = await getCartDetailsByCartId(cart_id);

        // Chuẩn hóa dữ liệu để bao gồm product_name, image_url, price
        const formattedDetails = details.map(detail => ({
            cart_id: detail.cart_id,
            quantity: detail.quantity,
            pw_id: detail.pw_id,
            item_subtotal: detail.item_subtotal,
            is_ground: detail.is_ground,
            product_name: detail.Product_Weight.Product.product_name,
            image_url: detail.Product_Weight.Product.image_url,
            price: detail.Product_Weight.product_price,
            weight_name: detail.Product_Weight.Weight_Option.weight_name
        }));

        res.status(200).json(formattedDetails);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const removeCartDetail = async (req,res) => {
    try {
        const cart_id = req.body.cart_id;
        const pw_id = req.body.pw_id;
        
        const result = await deleteCartDetailByCartIdAndPwId(cart_id, pw_id);
        res.status(200).json({
            success: 1,
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// this api is called after the order is added successfully
export const removeCartDetailsByCartId = async (req,res) => {
    try {
        const { cart_id } = req.params;
        const result = await deleteCartDetailsByCartId(cart_id);
        res.status(200).json({
            success: 1,
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}