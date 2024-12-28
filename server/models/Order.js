import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllOrders = async () => {
    return await prisma.order.findMany();
}

export const getOrderByID = async (order_id) => {
    return await prisma.order.findUnique({
        where: { order_id }
    });
}

export const createOrder = async (data) => {
    return await prisma.order.create({ data });
}

export const deleteOrder = async (order_id) => {
    return await prisma.order.delete({
        where: { order_id }
    });
}