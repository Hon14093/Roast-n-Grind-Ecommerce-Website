import React, { useState, useEffect } from 'react'
// import { PlusSquare } from 'lucide-react'
import { HousePlus } from 'lucide-react'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { EditAddress, AddAddress, DeleteWarning } from '../modals/address/AddressModals'
import { useCart } from '../../context/CartContext'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Checkbox } from '../ui/checkbox'
import { getAddressesByAccountId } from '@/hooks/addressAPI'
import { useAuth } from '../../context/AuthContext'

export default function AddressDetails({ addressId, setSelectedAddressId, nextStep }) {
    const { user } = useAuth();
    const { cartItems } = useCart();
    const [addresses, setAddresses] = useState([]);

    const totalPrice = (cartItems.length > 0)
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const handleSubmitSuccess = () => {
        getAddressesByAccountId(user.account_id ,setAddresses);
    }

    useEffect(() => {
        getAddressesByAccountId(user.account_id ,setAddresses);
    })

    const isAddressChecked = () => {
        if (addressId) {
            nextStep();
        } else {
            alert('Hãy chọn địa chỉ giao hàng');
        }
    }
    
    return (
        <div className='grid grid-cols-12 gap-4'>

            {/* Address Form */}
            <section className='col-span-7 mx-auto w-full'>

                <h1 className='font-semibold uppercase text-2xl pb-2'>địa chỉ giao hàng</h1>
                <div className='flex flex-wrap gap-4'>
                    {addresses.map((address) => (
                        <article 
                            key={address.Address.address_id}
                            className='py-1 pl-2 mb-4 h-52 w-64 items-stretch border-darkOlive border-2 rounded-xl'
                        >
                            <Checkbox
                                id={`address-${address.Address.address_id}`}
                                checked={addressId === address.Address.address_id}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedAddressId(address.Address.address_id);
                                    } else {
                                        setSelectedAddressId(null); // Unselect if unchecked (optional)
                                    }
                                }}
                            />
                            <p className='text-lg'>{address.Address.last_name} {address.Address.first_name}</p>
                            <p className='text-lg'>{address.Address.address_line}</p>
                            <p className='text-lg'>{address.Address.ward}</p>
                            <p className='text-lg'>{address.Address.district}</p>
                            <span className='flex'>
                                <p className='text-lg'>{address.Address.City.city_name}</p>
                                
                                <DeleteWarning 
                                    address_id={address.Address.address_id} 
                                    onSubmitSuccess={handleSubmitSuccess} 
                                />
                            </span>
                            <span className='flex'>
                                <p className='text-lg'>{address.Address.postal_code}</p>
                                <EditAddress 
                                    address={address.Address}
                                    onSubmitSuccess={handleSubmitSuccess} 
                                />
                                {/* <Button className='ml-auto text-blue-600' variant='link'>Chỉnh sửa</Button> */}
                            </span>
                        </article>
                    ))}

                    <AddAddress onSubmitSuccess={handleSubmitSuccess} />

                </div>

                <div className='pt-5'>
                    <Button className='bg-darkOlive border-darkOlive border-2 w-full hover:bg-ivory hover:text-darkOlive' onClick={isAddressChecked}>
                        Tiếp theo
                    </Button>
                </div>
            </section>

            {/* Display cart */}
            <section className='col-span-4 text-darkOlive' onClick={() => console.log(addresses)}>
                <h1 className='font-semibold uppercase text-2xl pb-2'>Giỏ hàng</h1>
                <ScrollArea className='h-[500px]'>
                    
                    {cartItems.map((item) => (
                        <div
                            key={`${item.product_id}-${item.weight_id}`}
                            className="flex items-start gap-4 mb-4"
                        >
                            <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-28 h-28 object-cover rounded"
                            />

                            <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-base">Size: {item.weight_name}</p>
                                <span className="text-base w-[5rem]">Số lượng: {item.quantity}</span>
                                <p className="text-base">Xay: {item.grind ? "Có" : "Không"}</p>
                                <p className="text-base">Thành tiền: {item.price}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>

                <Separator className='bg-darkOlive h-[0.5px] w-[50%] mb-4'/>
                
                <div>
                    <article className="flex text-lg">
                        <span className='font-bold'>
                            Thành tiền:
                        </span>
                        <span className="ml-auto pr-3">
                            {totalPrice} vnđ
                        </span>
                    </article>
                </div>

            </section>
        </div>
    )
}
