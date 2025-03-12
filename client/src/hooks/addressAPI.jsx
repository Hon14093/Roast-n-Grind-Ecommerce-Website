import axios from "axios";

export const getAllCities = async (setData) => {
    try {
        const response = await axios.get('http://localhost:5000/api/address/cities')
        setData(response.data.cities)
    } catch (error) {
        console.log(error);
    }
}

export const getAddressesByAccountId = async (account_id, setData) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/address/all/${account_id}`)
        setData(response.data.addresses)
    } catch (error) {
        console.log(error);
    }
}

export const createAddressFromUser = async (account_id, data) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/address/create/${account_id}`, data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteAddress = async (address_id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/address/delete/${address_id}`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateAddress = async (address_id, data) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/address/update/${address_id}`, data);
        return response.data
    } catch (error) {
        console.log(error)
    }
}