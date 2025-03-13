import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCities = async () => {
    return await prisma.city.findMany();       
}
