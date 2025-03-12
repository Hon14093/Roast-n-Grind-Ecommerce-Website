import React from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { CircleX, Plus, HousePlus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from "react";
import { Edit } from 'lucide-react';
import CityComboBox from '@/components/combobox/CityCombobox';
import { createAddressFromUser, deleteAddress } from '@/hooks/addressAPI';
import { useAuth } from '@/components/context/AuthContext';

export const AddAddress = ({onSubmitSuccess}) => {
    const [open, setOpen] = useState(false);
    const { user } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [ward, setWard] = useState(''); // phường
    const [district, setDistict] = useState(''); // quận or huyện
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState(''); // this is city id

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                first_name: firstName,
                last_name: lastName,
                address_line: addressLine,
                ward: ward,
                district: district,
                postal_code: postalCode,
                city_id: city
            }

            const result = await createAddressFromUser(user.account_id, data);
            if (result.success) {
                onSubmitSuccess();
                setOpen(false);
            }


        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='secondary' className='py-1 pl-2 mb-4 h-52 w-64 flex border-darkOlive border-2 rounded-xl hover:drop-shadow-lg bg-orange-50'>
                    <HousePlus size={60} />
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-ivory'>
                <DialogHeader>
                    <DialogTitle>Thêm địa chỉ</DialogTitle>
                    <DialogDescription className='text-base text-black'>

                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
                    <div className="space-y-4">
                        <article className='flex gap-4 w-full'>
                            <div className="grid gap-2 w-1/2">
                                <Label htmlFor="lastName">Họ</Label>
                                <Input 
                                    id="lastName" name="lastName" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setLastName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="grid gap-2 w-1/2">
                                <Label htmlFor="firstName">Tên</Label>
                                <Input 
                                    id="firstName" name="firstName" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required 
                                />
                            </div>
                        </article>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Tên đường, Tòa nhà, Số nhà</Label>
                            <Input 
                                id="address" name="address" 
                                className='border-darkOlive' 
                                onChange={(e) => setAddressLine(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="city">Phường</Label>
                                <Input 
                                    id="city" name="city" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setWard(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">Quận / Huyện</Label>
                                <Input 
                                    id="state" name="state" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setDistict(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="zipCode">Mã bưu điện</Label>
                                <Input 
                                    id="zipCode" name="zipCode" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <CityComboBox value={city} onChange={setCity} />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-darkOlive text-ivory">
                        Thêm địa chỉ
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export const EditAddress = () => {
    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine, setAddressLine] = useState('');
    const [ward, setWard] = useState(''); // phường
    const [district, setDistict] = useState(''); // quận or huyện
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState(''); // this is city id

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='text-blue-600 ml-auto' variant='link' onClick={() => setOpen(true)}>
                    Chỉnh sửa
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-ivory'>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
                    <DialogDescription className='text-base text-darkOlive'>

                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-6 lg:col-span-2">
                    <div className="space-y-4">
                        <article className='flex gap-4 w-full'>
                            <div className="grid gap-2 w-1/2">
                                <Label htmlFor="lastName">Họ</Label>
                                <Input 
                                    id="lastName" name="lastName" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setLastName(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="grid gap-2 w-1/2">
                                <Label htmlFor="firstName">Tên</Label>
                                <Input 
                                    id="firstName" name="firstName" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required 
                                />
                            </div>
                        </article>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Tên đường, Tòa nhà, Số nhà</Label>
                            <Input 
                                id="address" name="address" 
                                className='border-darkOlive' 
                                onChange={(e) => setAddressLine(e.target.value)}
                                required 
                            />
                        </div>
                        
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="city">Phường</Label>
                                <Input 
                                    id="city" name="city" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setWard(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <Label htmlFor="state">Quận / Huyện</Label>
                                <Input 
                                    id="state" name="state" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setDistict(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="zipCode">Mã bưu điện</Label>
                                <Input 
                                    id="zipCode" name="zipCode" 
                                    className='border-darkOlive' 
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required 
                                />
                            </div>
                            <div>
                                <CityComboBox value={city} onChange={setCity} />
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-darkOlive text-ivory">
                        Place Order
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteWarning = ({ address_id, onSubmitSuccess }) => {
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            const result = await deleteAddress(address_id);
            if (result.success) {
                onSubmitSuccess();
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='text-red-600 ml-auto -mb-2' variant='link' onClick={() => setOpen(true)}>
                    Xóa
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-ivory'>
                <DialogHeader>
                    <DialogTitle>Xóa địa chỉ?</DialogTitle>
                    <DialogDescription className='text-base text-darkOlive'>
                        Bạn có chắc chắn bạn muốn xóa địa chỉ này không?
                    </DialogDescription>

                </DialogHeader>

                <div className='flex'>
                    <Button>
                        Hủy
                    </Button>
                    <Button onClick={handleDelete} className='ml-auto' variant='destructive'>
                        Xóa
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}