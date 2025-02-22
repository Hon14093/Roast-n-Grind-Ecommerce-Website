import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProducts = async () => {
    return await prisma.product.findMany();
}

export const getAllProductsDetails = async () => {
    return await prisma.product.findMany({
        select: {
            product_id: true,
            product_name: true,
            description: true,
            Roast_Level: {
                select: {
                    roast_lvl: true,
                }
            },
            Product_Type: {
                select: {
                    type_name: true,
                }
            },
            Aroma: {
                select: {
                    aroma_name: true,
                }
            },
        },
    });
}

export const getProductByID = async (product_id) => {
    return await prisma.product.findUnique({
        where: { product_id },
    });
}

export const createProduct = async (data) => {
    return await prisma.product.create({ data });
}

export const deleteProduct = async (product_id) => {
    return await prisma.product.delete({
        where: { product_id },
    });
}

