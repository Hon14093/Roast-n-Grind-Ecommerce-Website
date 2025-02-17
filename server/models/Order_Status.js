import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrderStatus = async (data) => {
    return await prisma.order_Status.create({
        data: data
    });
}
export const findOrderStatusById = async (id) => {
    return await prisma.order_Status.findUnique({
        where: { os_id: id } // Fixed field name
    });
}
export const getAllOrderStatuses = async () => {
    return await prisma.order_Status.findMany();
}
export const getOrderStatusByName = async (name) => {
    return await prisma.order_Status.findMany({
        where: { os_name: name }
    });
}
export const updateOrderStatus = async (id, data) => {
    return await prisma.order_Status.update({
        where: { os_id: id },
        data: data
    });
}
export const deleteOrderStatus = async (id) => {
    return await prisma.order_Status.delete({
        where: { os_id: id }
    });
}



