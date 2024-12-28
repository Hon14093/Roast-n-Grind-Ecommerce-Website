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