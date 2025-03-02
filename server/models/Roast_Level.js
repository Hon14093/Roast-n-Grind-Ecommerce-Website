import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllRoastLevels = async () => {
    return await prisma.roast_Level.findMany();
}