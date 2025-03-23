import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllDiscounts = async () => {
    const discounts = await prisma.discount.findMany();

    return discounts.map(discount => ({
        ...discount,
        start_date: discount.start_date.toISOString().slice(0, 10),
        end_date: discount.end_date.toISOString().slice(0, 10)
    }))
}

export const createDiscount = async (data) => {
    return await prisma.discount.create({ data });
}

export const updateDiscount = async (discount_id, data) => {
    return await prisma.discount.update({
        where: { discount_id },
        data
    })
}



export const findDiscountById = async (id) => {
    return await prisma.discount.findUnique({
        where: { discount_id: id } // Fixed field name
    });
}

export const getActiveDiscounts = async () => {
    return await prisma.discount.findMany({
        where: { is_active: true }
    });
}

export const getDiscountsByDateRange = async (startDate, endDate) => {
    return await prisma.discount.findMany({
        where: {
            start_date: { gte: startDate },
            end_date: { lte: endDate }
        }
    });
}

