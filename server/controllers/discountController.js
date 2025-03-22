import { createDiscount, getAllDiscounts } from "../models/Discount.js";

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