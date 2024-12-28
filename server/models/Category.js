import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCategories = async () => {
    return await prisma.category.findMany();
}

export const createCategory = async (name) => {
    return await prisma.category.create({
        data: {
            category_name: name
        }
    });
}

export const deleteCategory = async (category_id) => {
    return await prisma.category.delete({
        where: { category_id }
    });
}