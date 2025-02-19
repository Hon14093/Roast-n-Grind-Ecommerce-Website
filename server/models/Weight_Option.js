import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllOptions = async () => {
    return await prisma.weight_Option.findMany();
}

export const createWeightOption = async (weightName) => {
    return await prisma.weight_Option.create({
        data: {
            weight_name: weightName,
        }
    });
}

export const deleteWeightOption = async (weight_id) => {
    return await prisma.weight_Option.delete({
        where: { weight_id }
    });
}

export const findWeightOptionById = async (weight_id) => {
    return await prisma.weight_Option.findUnique({
        where: { weight_id }
    });
}

export const updateWeightOption = async (weight_id, data) => {
    return await prisma.weight_Option.update({
        where: { weight_id },
        data: data
    });
}

export const getWeightOptionByName = async (weightName) => {
    return await prisma.weight_Option.findMany({
        where: { weight_name    : weightName } 
    });
}

