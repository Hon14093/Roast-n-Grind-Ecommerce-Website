import { getAllRoastLevels } from "../models/Roast_Level.js";
import { getAllTypes } from "../models/Product_Type.js";
import { getAllOptions } from "../models/Weight_Option.js";
import { getAllAromas } from "../models/Aroma.js";
import { 
    getAllProducts, 
    getAllProductsDetails,
    createProduct,
    updateProduct,
} from "../models/Product.js";


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
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (req,res) => {
    try {
        const data = req.body;
        const newProduct = await createProduct(data);
        res.status(201).json({ 
            success: 1,
            message: 'Product created successfully',
            new_product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateProductInfo = async (req,res) => {
    try {
        const { product_id } = req.params;
        const data = req.body;
        console.log(data);
        
        if (!product_id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const updatedProduct = await updateProduct(product_id, data);

        return res.status(200).json({ 
            success: 1,
            message: 'Product updated successfully',
            updated_product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// aroma -------------------------------------------------
export const returnAllAromas = async (req,res) => {
    try {
        const aromas = await getAllAromas();
        res.status(200).json({ aromas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// weight option -------------------------------------------------
export const returnAllOptions = async (req,res) => {
    try {
        const options = await getAllOptions();
        res.status(200).json({ options });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// export const addWeightOption = async (data) => {
//     try {
//         const newWeight = await weightModel.createWeightOption(data);
//         console.log(newWeight);
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const deleteWeightOption = async (data) => {
//     try {
//         const deleteOption = await weightModel.deleteWeightOption(data);
//         console.log(deleteOption)
//     } catch (error) {
//         console.log(error)
//     }
// }

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
export const returnAllTypes = async (req,res) => {
    try {
        const types = await getAllTypes();
        res.status(200).json({ types });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// export const addType = async (data) => {
//     try {
//         const newType = await typeModel.createType(data);
//         console.log(newType)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const deleteType = async (data) => {
//     try {
//         const deleteType = await typeModel.deleteType(data);
//         console.log(deleteType);
//     } catch (error) {
//         console.log(error);
//     }
// }

// roast level -------------------------------------------------
export const returnAllRoastLevels = async (req,res) => {
    try {
        const roastLevels = await getAllRoastLevels();
        res.status(200).json({ roastLevels });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}