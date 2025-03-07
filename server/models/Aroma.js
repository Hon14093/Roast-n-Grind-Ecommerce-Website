import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllAromas = async () => {
    return await prisma.aroma.findMany();
}