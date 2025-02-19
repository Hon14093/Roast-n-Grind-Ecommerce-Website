import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUserAddress = async (data) => { // Create a new user address
    return await prisma.user_Address.create({
        data: data
    });
}

export const findUserAddressById = async (id) => { // Find a user address by ID
    return await prisma.user_Address.findUnique({
        where: { user_address_id: id } // Fixed field name
    });
}

export const getAllUserAddresses = async () => { // Get all user addresses
    return await prisma.user_Address.findMany();
}

export const getUserAddressesByUserId = async (userId) => { // Get all user addresses by user ID
    return await prisma.user_Address.findMany({
        where: { user_id: userId }
    });
}

export const updateUserAddress = async (id, data) => { // Update a user address
    return await prisma.user_Address.update({
        where: { user_address_id: id },
        data: data
    });
}

export const deleteUserAddress = async (id) => { // Delete a user address
    return await prisma.user_Address.delete({
        where: { user_address_id: id }
    });
}

export const getUserAddressByStreet = async (street) => { // Get user address by street
    return await prisma.user_Address.findMany({
        where: { street: street }
    });
}

export const getUserAddressByCity = async (city) => { // Get user address by city
    return await prisma.user_Address.findMany({
        where: { city: city }
    });
}

export const getUserAddressByState = async (state) => { // Get user address by state
    return await prisma.user_Address.findMany({
        where: { state: state }
    });
}

export const getUserAddressByZip = async (zip) => { // Get user address by zip
    return await prisma.user_Address.findMany({
        where: { zip: zip }
    });
}

export const getUserAddressByCountry = async (country) => { // Get user address by country
    return await prisma.user_Address.findMany({
        where: { country: country }
    });
}

export const getUserAddressByUserId = async (userId) => { // Get user address by user ID
    return await prisma.user_Address.findMany({
        where: { user_id: userId }
    });
}

export const getUserAddressByStreetAndCity = async (street, city) => { // Get user address by street and city
    return await prisma.user_Address.findMany({
        where: {
            street,
            city
        }
    });
}

export const getUserAddressByStreetAndState = async (street, state) => { // Get user address by street and state
    return await prisma.user_Address.findMany({
        where: {
            street,
            state
        }
    });
}

export const getUserAddressByStreetAndZip = async (street, zip) => { // Get user address by street and zip
    return await prisma.user_Address.findMany({
        where: {
            street,
            zip
        }
    });
}

export const getUserAddressByStreetAndCountry = async (street, country) => { // Get user address by street and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            country
        }
    });
}

export const getUserAddressByCityAndState = async (city, state) => { // Get user address by city and state
    return await prisma.user_Address.findMany({
        where: {
            city,
            state
        }
    });
}

export const getUserAddressByCityAndZip = async (city, zip) => { // Get user address by city and zip
    return await prisma.user_Address.findMany({
        where: {
            city,
            zip
        }
    });
}

export const getUserAddressByCityAndCountry = async (city, country) => { // Get user address by city and country
    return await prisma.user_Address.findMany({
        where: {
            city,
            country
        }
    });
}

export const getUserAddressByStateAndZip = async (state, zip) => { // Get user address by state and zip
    return await prisma.user_Address.findMany({
        where: {
            state,
            zip
        }
    });
}

export const getUserAddressByStateAndCountry = async (state, country) => { // Get user address by state and country
    return await prisma.user_Address.findMany({
        where: {
            state,
            country
        }
    });
}

export const getUserAddressByZipAndCountry = async (zip, country) => { // Get user address by zip and country
    return await prisma.user_Address.findMany({
        where: {
            zip,
            country
        }
    });
}

export const getUserAddressByStreetAndCityAndState = async (street, city, state) => { // Get user address by street, city, and state
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            state
        }
    });
}   

export const getUserAddressByStreetAndCityAndZip = async (street, city, zip) => { // Get user address by street, city, and zip
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            zip
        }
    });
}

export const getUserAddressByStreetAndCityAndCountry = async (street, city, country) => { // Get user address by street, city, and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            country
        }
    });
}

export const getUserAddressByStreetAndStateAndZip = async (street, state, zip) => { // Get user address by street, state, and zip
    return await prisma.user_Address.findMany({
        where: {
            street,
            state,
            zip
        }
    });
}

export const getUserAddressByStreetAndStateAndCountry = async (street, state, country) => { // Get user address by street, state, and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            state,
            country
        }
    });
}

export const getUserAddressByStreetAndZipAndCountry = async (street, zip, country) => { // Get user address by street, zip, and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            zip,
            country
        }
    });
}

export const getUserAddressByCityAndStateAndZip = async (city, state, zip) => { // Get user address by city, state, and zip
    return await prisma.user_Address.findMany({
        where: {
            city,
            state,
            zip
        }
    });
}

export const getUserAddressByCityAndStateAndCountry = async (city, state, country) => { // Get user address by city, state, and country
    return await prisma.user_Address.findMany({
        where: {
            city,
            state,
            country
        }
    });
}

export const getUserAddressByCityAndZipAndCountry = async (city, zip, country) => { // Get user address by city, zip, and country
    return await prisma.user_Address.findMany({
        where: {
            city,
            zip,
            country
        }
    });
}

export const getUserAddressByStateAndZipAndCountry = async (state, zip, country) => { // Get user address by state, zip, and country
    return await prisma.user_Address.findMany({
        where: {
            state,
            zip,
            country
        }
    });
}

export const getUserAddressByStreetAndCityAndStateAndZip = async (street, city, state, zip) => { // Get user address by street, city, state, and zip
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            state,
            zip
        }
    });
}

export const getUserAddressByStreetAndCityAndStateAndCountry = async (street, city, state, country) => { // Get user address by street, city, state, and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            state,
            country
        }
    });
}

export const getUserAddressByStreetAndCityAndZipAndCountry = async (street, city, zip, country) => { // Get user address by street, city, zip, and country
    return await prisma.user_Address.findMany({
        where: {
            street,
            city,
            zip,
            country
        }
    });
}

