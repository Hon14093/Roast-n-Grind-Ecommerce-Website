import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrderDetail = async (data) => {
    return await prisma.order_Details.create({
        data: data
    });
};

export const findOrderDetailById = async (id) => {
    return await prisma.order_Details.findUnique({
        where: { od_id: id } // Fixed field name
    });
};

export const getAllOrderDetails = async () => {
    return await prisma.order_Details.findMany();
};

export const getOrderDetailsByOrderId = async (orderId) => {
    return await prisma.order_Details.findMany({
        where: { order_id: orderId }
    });
};

export const getOrderDetailsByProductWeight = async (pwId) => {
    return await prisma.order_Details.findMany({
        where: { pw_id: pwId }
    });
};
