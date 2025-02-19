import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDiscount = async (data) => {
    return await prisma.discount.create({
        data: data
    });
}

export const findDiscountById = async (id) => {
    return await prisma.discount.findUnique({
        where: { discount_id: id } // Fixed field name
    });
}

export const getAllDiscounts = async () => {
    return await prisma.discount.findMany();
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

