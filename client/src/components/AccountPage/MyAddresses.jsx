import { useAuth } from '@/context/AuthContext';
import { getAddressesByAccountId } from '@/hooks/addressAPI';
import React, { useEffect, useState } from 'react'
import { DeleteWarning, EditAddress, AddAddress } from '../modals/address/AddressModals';
import { Checkbox } from '../ui/checkbox';

function MyAddresses() {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getAddressesByAccountId(user.account_id ,setAddresses);
    })

    const handleSubmitSuccess = () => {
        getAddressesByAccountId(user.account_id ,setAddresses);
    }

    return (
        <div>
            <div className='flex flex-wrap gap-4'>
                {addresses.map((address) => (
                    <article 
                        key={address.address_id}
                        className='py-1 pl-2 mb-4 h-fit w-64 items-stretch border-darkOlive border-2 rounded-xl'
                    >
                        <p className='text-lg'>{address.last_name} {address.first_name}</p>
                        <p className='text-lg'>{address.address_line}</p>
                        <p className='text-lg'>{address.ward}</p>
                        <p className='text-lg'>{address.district}</p>
                        <span className='flex'>
                            <p className='text-lg'>{address.City.city_name}</p>
                            
                            <DeleteWarning 
                                address_id={address.address_id} 
                                onSubmitSuccess={handleSubmitSuccess} 
                            />
                        </span>
                        <span className='flex'>
                            <p className='text-lg'>{address.postal_code}</p>
                            <EditAddress 
                                address={address}
                                onSubmitSuccess={handleSubmitSuccess} 
                            />
                            {/* <Button className='ml-auto text-blue-600' variant='link'>Chỉnh sửa</Button> */}
                        </span>
                    </article>
                ))}

                <AddAddress onSubmitSuccess={handleSubmitSuccess} />

            </div>
        </div>
    )
}

export default MyAddresses