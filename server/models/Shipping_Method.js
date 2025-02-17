import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllShippingMethods = async () => { // Get all shipping methods
    return await prisma.shipping_Method.findMany();
}

export const getShippingMethodByID = async (method_id) => { // Get shipping method by ID
    return await prisma.shipping_Method.findUnique({
        where: { method_id },
    });
}

export const createShippingMethod = async (data) => { // Create a new shipping method
    return await prisma.shipping_Method.create({ data });
}

export const deleteShippingMethod = async (method_id) => { // Delete a shipping method
    return await prisma.shipping_Method.delete({
        where: { method_id },
    });
}

export const updateShippingMethod = async (method_id, data) => { // Update a shipping method
    return await prisma.shipping_Method.update({
        where: { method_id },
        data: data
    });
}

export const getShippingMethodByName = async (name) => { // Get shipping method by name
    return await prisma.shipping_Method.findMany({
        where: { method_name: name }
    });
}

export const getShippingMethodByPrice = async (price) => { // Get shipping method by price
    return await prisma.shipping_Method.findMany({
        where: { price: price }
    });
}

export const getShippingMethodByDuration = async (duration) => { // Get shipping method by duration
    return await prisma.shipping_Method.findMany({
        where: { duration: duration }
    });
}

export const getShippingMethodByDescription = async (description) => { // Get shipping method by description
    return await prisma.shipping_Method.findMany({
        where: { description: description }

    });
}

