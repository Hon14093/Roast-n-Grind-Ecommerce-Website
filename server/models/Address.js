import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await prisma.address.findMany();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch addresses' });
    }
};

export const getAddressById = async (req, res) => {
    const { id } = req.params;
    try {
        const address = await prisma.address.findUnique({ where: { id } });
        if (!address) return res.status(404).json({ error: 'Address not found' });
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch address' });
    }
};

export const createAddress = async (req, res) => {
    try {
        const newAddress = await prisma.address.create({
            data: req.body,
        });
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create address' });
    }
};

export const updateAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAddress = await prisma.address.update({
            where: { id },
            data: req.body,
        });
        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update address' });
    }
};

export const deleteAddress = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.address.delete({ where: { id } });
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete address' });
    }
};