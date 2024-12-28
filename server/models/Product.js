import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProducts = async () => {
    return await prisma.product.findMany();
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

