// AddressDetails.jsx
import React, { useState, useEffect } from "react";
import { HousePlus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { EditAddress, AddAddress, DeleteWarning } from '../modals/address/AddressModals';
import { useCart } from '../../context/CartContext';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { getAddressesByAccountId } from '@/hooks/addressAPI';
import { useAuth } from '../../context/AuthContext';

export default function AddressDetails({ addressId, setSelectedAddressId, nextStep }) {
    const { user } = useAuth();
    const { cartItems } = useCart();
    const [addresses, setAddresses] = useState([]);

    const totalPrice = cartItems.length > 0
        ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0;

    const handleSubmitSuccess = () => {
        getAddressesByAccountId(user.account_id, setAddresses);
    };

    useEffect(() => {
        getAddressesByAccountId(user.account_id, setAddresses);
    }, [user.account_id]);

    const isAddressChecked = () => {
        if (addressId) {
            nextStep();
        } else {
            alert('Hãy chọn địa chỉ giao hàng');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Address Section */}
                <section className="md:col-span-7">
                    <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">
                        Địa chỉ giao hàng
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <article 
                                key={address.Address.address_id}
                                className="relative p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id={`address-${address.Address.address_id}`}
                                        checked={addressId === address.Address.address_id}
                                        onCheckedChange={(checked) => {
                                            setSelectedAddressId(checked ? address.Address.address_id : null);
                                        }}
                                        className="mt-1"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <p className="font-semibold text-gray-900">
                                            {address.Address.last_name} {address.Address.first_name}
                                        </p>
                                        <p className="text-gray-600">{address.Address.address_line}</p>
                                        <p className="text-gray-600">{address.Address.ward}</p>
                                        <p className="text-gray-600">{address.Address.district}</p>
                                        <p className="text-gray-600">
                                            {address.Address.City.city_name}, {address.Address.postal_code}
                                        </p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <EditAddress 
                                        address={address.Address}
                                        onSubmitSuccess={handleSubmitSuccess}
                                    />
                                    <DeleteWarning 
                                        address_id={address.Address.address_id}
                                        onSubmitSuccess={handleSubmitSuccess}
                                    />
                                </div>
                            </article>
                        ))}
                        <AddAddress onSubmitSuccess={handleSubmitSuccess} />
                    </div>

                    <Button 
                        className="mt-8 w-full bg-darkOlive hover:bg-darkOlive/90 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                        onClick={isAddressChecked}
                    >
                        Tiếp theo
                    </Button>
                </section>

                {/* Cart Section */}
                <section className="md:col-span-5">
                    <h1 className="text-2xl font-bold uppercase text-gray-800 mb-6">
                        Giỏ hàng
                    </h1>
                    
                    <ScrollArea className="h-[500px] bg-white rounded-lg border border-gray-200 p-4">
                        {cartItems.map((item) => (
                            <div
                                key={`${item.product_id}-${item.weight_id}`}
                                className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-b-0"
                            >
                                <img
                                    src={item.image_url}
                                    alt={item.product_name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-600">Size: {item.weight_name}</p>
                                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                                    <p className="text-sm text-gray-600">
                                        Xay: {item.grind ? "Có" : "Không"}
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {item.price.toLocaleString()} vnđ
                                    </p>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>

                    <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-bold text-gray-800">Tổng cộng:</span>
                            <span className="font-semibold text-darkOlive">
                                {totalPrice.toLocaleString()} vnđ
                            </span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}