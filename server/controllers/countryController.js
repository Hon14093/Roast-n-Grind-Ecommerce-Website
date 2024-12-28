import * as countryModel from '../models/Country.js'

export const getAllCountries = async (res, req) => {
    try {
        const countries = await countryModel.getAllCountries();
        console.log(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error)
    }

}
getAllCountries();