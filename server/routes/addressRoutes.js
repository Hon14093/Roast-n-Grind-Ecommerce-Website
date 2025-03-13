import express from 'express';
import { 
    returnAllCities, 
    returnAllAddressesByAccountId,
    addAddressByAccountId,
    removeAddress,
    editAddress
} from '../controllers/addressController.js';

const router =  express.Router();

router.get('/all/:account_id', returnAllAddressesByAccountId)
router.get('/cities', returnAllCities);

router.post('/create/:account_id', addAddressByAccountId)

router.delete('/delete/:address_id', removeAddress)

router.put('/update/:address_id', editAddress)

export default router;