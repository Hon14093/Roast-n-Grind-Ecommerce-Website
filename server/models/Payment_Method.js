import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPaymentMethod = async (data) => {
    return await prisma.payment_Method.create({
        data: data
    });
}

export const findPaymentMethodById = async (id) => {
    return await prisma.payment_Method.findUnique({
        where: { method_id: id } // Fixed field name
    });
}

export const getAllPaymentMethods = async () => {
    return await prisma.payment_Method.findMany();
}

export const getPaymentMethodByName = async (name) => {
    return await prisma.payment_Method.findMany({
        where: { method_name: name }
    });
}

export const updatePaymentMethod = async (id, data) => {
    return await prisma.payment_Method.update({
        where: { method_id: id },
        data: data
    });
}

export const deletePaymentMethod = async (id) => {
    return await prisma.payment_Method.delete({
        where: { method_id: id }
    });
}
