import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAddressesByUserId = async (account_id) => {
    return prisma.address.findMany({
        include: {
            City: true
        },
        where: { account_id: account_id },
    })
}

export const createAddress = async (data) => {
    return prisma.address.create({ data });
}

export const deleteAddress = async (address_id) => {
    return prisma.address.delete({
        where: {
            address_id: address_id
        }
    })
}

export const updateAddress = async (address_id, data) => {
    return prisma.address.update({
        where: { address_id },
        data
    })
}