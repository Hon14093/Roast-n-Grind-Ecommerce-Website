import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createShoppingCart = async (accountId) => {
    return await prisma.shopping_Cart.create({
        data: {
            account_id: accountId
        }
    });
}

export const findShoppingCartById = async (id) => {
    return await prisma.shopping_Cart.findUnique({
        where: { sc_id: id } // Fixed field name
    });
}

export const getAllShoppingCarts = async () => {
    return await prisma.shopping_Cart.findMany();
}

export const getShoppingCartByUserId = async (userId) => {
    return await prisma.shopping_Cart.findFirst({
        where: { account_id: userId }
    });
}

export const updateShoppingCart = async (id, data) => {
    return await prisma.shopping_Cart.update({
        where: { sc_id: id },
        data: data
    });
}

export const deleteShoppingCart = async (id) => {
    return await prisma.shopping_Cart.delete({
        where: { sc_id: id }
    });
}

