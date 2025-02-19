import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProductFlavour = async (data) => {
    return await prisma.product_flavour.create({
        data: data
    });
}

export const findProductFlavourById = async (id) => {
    return await prisma.product_flavour.findUnique({
        where: { pf_id: id } // Fixed field name
    });
}

export const getAllProductFlavours = async () => {
    return await prisma.product_flavour.findMany();
}

export const getProductFlavourByFlavourId = async (flavourId) => {
    return await prisma.product_flavour.findMany({
        where: { flavour_id: flavourId }
    });
}

export const getProductFlavourByProductId = async (productId) => {
    return await prisma.product_flavour.findMany({
        where: { product_id: productId }
    });
}

export const updateProductFlavour = async (id, data) => {
    return await prisma.product_flavour.update({
        where: { pf_id: id },
        data: data
    });
}

export const deleteProductFlavour = async (id) => {
    return await prisma.product_flavour.delete({
        where: { pf_id: id }
    });
}

