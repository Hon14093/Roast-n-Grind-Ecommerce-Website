import * as weightModel from "../models/Weight_Option.js"
import * as categoryModel from "../models/Category.js"
import * as typeModel from "../models/Product_Type.js"
import { getAllProducts, getAllProductsDetails } from "../models/Product.js"; // this import works

export const returnAllProducts = async (req,res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const returnAllProductsDetails = async (req,res) => {
    try {
        const products = await getAllProductsDetails();
        res.status(200).json({products});
        // res.status(200).json({ message: 'Product API is working!' });
    } catch (error) {
        console.log(error);
    }
}

// weight option -------------------------------------------------
export const addWeightOption = async (data) => {
    try {
        const newWeight = await weightModel.createWeightOption(data);
        console.log(newWeight);
    } catch (error) {
        console.log(error);
    }
}

export const deleteWeightOption = async (data) => {
    try {
        const deleteOption = await weightModel.deleteWeightOption(data);
        console.log(deleteOption)
    } catch (error) {
        console.log(error)
    }
}

// category -------------------------------------------------
export const addCategory = async (data) => {
    try {
        const newCategory = await categoryModel.createCategory(data);
        console.log(newCategory);
    } catch (error) {
        console.log(error)
    }
}

// product type -------------------------------------------------
export const addType = async (data) => {
    try {
        const newType = await typeModel.createType(data);
        console.log(newType)
    } catch (error) {
        console.log(error)
    }
}

export const deleteType = async (data) => {
    try {
        const deleteType = await typeModel.deleteType(data);
        console.log(deleteType);
    } catch (error) {
        console.log(error);
    }
}

