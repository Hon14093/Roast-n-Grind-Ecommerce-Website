import { createDiscount, getAllDiscounts, updateDiscount } from "../models/Discount.js";

export const addDiscount = async (req,res) => {
    try {
        const data = req.body;
        const newDiscount = await createDiscount(data);

        return res.status(200).json({
            success: 1,
            newDiscount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAllDiscounts = async (req,res) => {
    try {
        const discounts = await getAllDiscounts();
        res.status(200).json({ discounts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const editDiscount = async (req,res) => {
    try {
        const { discount_id } = req.params;
        const data = req.body;
        const updatedDiscount = await updateDiscount(discount_id, data);

        res.status(200).json({
            success: 1,
            updatedDiscount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}