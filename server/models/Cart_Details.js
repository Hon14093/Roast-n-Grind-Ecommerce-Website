import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCartDetail = async (data) => {
    return await prisma.cart_Details.createMany({ 
        data,
        skipDuplicates: true
    });
};

export const getAllCartDetails = async () => {
    return await prisma.cart_Details.findMany();
};

export const getCartDetailsById = async (cd_id) => {
    return await prisma.cart_Details.findUnique({
        where: { cd_id }
    });
};

export const getCartDetailsByCartId = async (cart_id) => {
    return await prisma.cart_Details.findMany({
        where: { cart_id }
    });
};

export const updateCartDetail = async (cd_id, data) => {
    return await prisma.cart_Details.update({
        where: { cd_id },
        data
    });
};

export const deleteCartDetail = async (cd_id) => {
    return await prisma.cart_Details.delete({
        where: { cd_id }
    });
};

export const getCartDetailsByProductId = async (product_id) => {
    return await prisma.cart_Details.findMany({
        where: { product_id }
    });
};

export const getCartDetailsByCartIdAndProductId = async (cart_id, product_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndWeightId = async (cart_id, product_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndFlavourId = async (cart_id, product_id, flavour_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            flavour_id
        }
    });
};

export const getCartDetailsByCartIdAndProductIdAndFlavourIdAndWeightId = async (cart_id, product_id, flavour_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            product_id,
            flavour_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndFlavourId = async (cart_id, flavour_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            flavour_id
        }
    });
};

export const getCartDetailsByCartIdAndWeightId = async (cart_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            weight_id
        }
    });
};

export const getCartDetailsByCartIdAndFlavourIdAndWeightId = async (cart_id, flavour_id, weight_id) => {
    return await prisma.cart_Details.findMany({
        where: {
            cart_id,
            flavour_id,
            weight_id
        }
    });
};

