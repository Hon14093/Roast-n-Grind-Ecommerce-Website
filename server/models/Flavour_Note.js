import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createFlavour = async (data) => {
    return await prisma.flavour_Note.create({
        data: data
    });
};

export const findFlavourById = async (id) => {
    return await prisma.flavour_Note.findUnique({
        where: { flavour_id: id } // Fixed field name
    });
};

export const getAllFlavours = async () => {
    return await prisma.flavour_Note.findMany();
};

export const getFlavourByName = async (name) => {
    return await prisma.flavour_Note.findMany({
        where: { flavour_name: name }
    });
};

export const updateFlavour = async (id, data) => {
    return await prisma.flavour_Note.update({
        where: { flavour_id: id },
        data: data
    });
};

export const deleteFlavour = async (id) => {
    return await prisma.flavour_Note.delete({
        where: { flavour_id: id }
    });
};


