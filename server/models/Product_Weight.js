import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllProductWeights = async () => {
    return await prisma.product_Weight.findMany();
}

// working
export const getAllProductVariations = async () => {
    return await prisma.product_Weight.findMany({
        include: {
            Product: true,
            Weight_Option: true,
        }
    });
};

export const createProductWeight = async (data) => {
    return await prisma.product_Weight.create({ data });
}

export const deleteWeight = async (weight_id) => {
    return await prisma.product_Weight.delete({
        where: { weight_id }
    });
}

export const updateWeight = async (weight_id, weight) => {
    return await prisma.product_Weight.update({
        where: { weight_id },
        data: {
            weight
        }
    });
}

export const getWeightById = async (weight_id) => {
    return await prisma.product_Weight.findUnique({
        where: { weight_id }
    });
}

export const getWeightByWeight = async (weight) => {
    return await prisma.product_Weight.findMany({
        where: { weight }
    });
}

export const getWeightByProductId = async (product_id) => {
    return await prisma.product_Weight.findMany({
        where: { product_id }
    });
}

export const getWeightByWeightId = async (weight_id) => {
    return await prisma.product_Weight.findMany({
        where: { weight_id }
    });
}

export const getWeightByProductIdAndWeightId = async (product_id, weight_id) => {
    return await prisma.product_Weight.findMany({
        where: {
            product_id,
            weight_id
        }
    });
}

