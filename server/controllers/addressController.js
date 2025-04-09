import { getAllCities } from "../models/City.js";
import { 
    getAddressesByUserId,
    createAddress, 
    deleteAddress, 
    updateAddress 
} from "../models/Address.js";

export const returnAllCities = async (req,res) => {
    try {
        const cities = await getAllCities();
        res.status(201).json({
            cities
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }

}

export const returnAllAddressesByAccountId = async (req,res) => {
    try {
        const { account_id } = req.params;
        const addresses = await getAddressesByUserId(account_id);
        res.status(201).json({ addresses })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

// this will create an address first then use the address_id
// to create a user_address entity
export const addAddressByAccountId = async (req,res) => {
    try {
        const { account_id } = req.params;
        const data = req.body;
        const newAddress = await createAddress(data);

        // const usData = {
        //     account_id: account_id,
        //     address_id: newAddress.address_id
        // }
        // const newUA = await createUserAddress(usData);

        res.status(201).json({
            success: 1,
            newAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

export const removeAddress = async (req,res) => {
    try {
        const { address_id } = req.params;
        const deletedAddress = await deleteAddress(address_id);
        res.status(201).json({
            success: 1,
            deletedAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}

export const editAddress = async (req,res) => {
    try {
        const { address_id } = req.params;
        const data = req.body;
        console.log(data)
        const updatedAddress = await updateAddress(address_id, data);
        res.status(201).json({
            success: 1,
            updatedAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }
}