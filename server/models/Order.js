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

export const updateOrder = async (order_id, data) => {
    return await prisma.order.update({
        where: { order_id },
        data
    });
}

export const getOrderByUserID = async (user_id) => {
    return await prisma.order.findMany({
        where: { user_id }
    });
}

export const getOrderByStatus = async (status) => {
    return await prisma.order.findMany({
        where: { status }
    });
}

export const getOrderByDate = async (date) => {
    return await prisma.order.findMany({
        where: { date }
    });
}

export const getOrderByTotal = async (total) => {
    return await prisma.order.findMany({
        where: { total }
    });
}

export const getOrderByUserIDAndStatus = async (user_id, status) => {
    return await prisma.order.findMany({
        where: {
            user_id,
            status
        }
    });
}

