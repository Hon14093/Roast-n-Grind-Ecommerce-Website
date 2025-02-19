import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllTypes = async () => {
    return await prisma.product_Type.findMany();
}

export const createType = async (typeName) => {
    return await prisma.product_Type.create({
        data: {
            type_name: typeName
        }
    });
}

export const deleteType = async (type_id) => {
    return await prisma.product_Type.delete({
        where: { type_id }
    })
}

export const getTypeById = async (type_id) => {
    return await prisma.product_Type.findUnique({
        where: { type_id }
    })
}

export const updateType = async (type_id, typeName) => {
    return await prisma.product_Type.update({
        where: { type_id },
        data: {
            type_name: typeName
        }
    })
}

export const getTypeByTypeName = async (typeName) => {
    return await prisma.product_Type.findMany({
        where: { type_name: typeName }
    })
}

export const getTypeByProductId = async (product_id) => {
    return await prisma.product_Type.findMany({
        where: { product_id }
    })
}


