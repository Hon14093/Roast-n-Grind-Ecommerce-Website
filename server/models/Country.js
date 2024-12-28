import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCountries = async () => {
    return await prisma.country.findMany();
}
