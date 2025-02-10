import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all countries
export const getAllCountries = async (req, res) => {
    try {
        const countries = await prisma.country.findMany();
        res.json(countries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch countries' });
    }
};

// Get a country by ID
export const getCountryById = async (req, res) => {
    const { id } = req.params;
    try {
        const country = await prisma.country.findUnique({ 
            where: { country_id: parseInt(id) } // Convert ID to integer
        });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch country' });
    }
};

// Create a new country
export const createCountry = async (req, res) => {
    const { country_name } = req.body; // Correct field name
    try {
        const newCountry = await prisma.country.create({ 
            data: { country_name } 
        });
        res.status(201).json(newCountry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create country' });
    }
};

// Update a country
export const updateCountry = async (req, res) => {
    const { id } = req.params;
    const { country_name } = req.body;
    try {
        const updatedCountry = await prisma.country.update({
            where: { country_id: parseInt(id) }, // Convert ID to integer
            data: { country_name },
        });
        res.json(updatedCountry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to update country' });
    }
};

// Delete a country
export const deleteCountry = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.country.delete({ 
            where: { country_id: parseInt(id) } // Convert ID to integer
        });
        res.json({ message: 'Country deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to delete country' });
    }
};
