import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios';

function MyAccountInfo() {
    const { user } = useAuth();
    const [data, setData] = useState({});

    useEffect(() => {
        const getAccountInfo = async (account_id) => {
            try {
                const result = await axios.get(`http://localhost:5000/api/auth/info/${account_id}`);
                setData(result.data.info);
                console.log(result.data.info)
            } catch (error) {
                console.log(error);
            }
        }

        getAccountInfo(user.account_id)
    }, [])

    return (
        <section className='p-2 grid gap-4'>
            <div className='flex gap-4'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="accountName" className='font-semibold text-lg'>Tên tài khoản</Label>
                    <Input 
                        id="accountName" 
                        defaultValue={data.account_name}
                        className='cursor-not-allowed bg-white text-darkOlive md:text-lg border border-darkOlive'
                        readOnly 
                        // onChange={(e) => setProductName(e.target.value)}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className='font-semibold text-lg'>Email</Label>
                    <Input 
                        id="email" 
                        defaultValue={data.email}
                        className='cursor-not-allowed bg-white text-darkOlive md:text-lg border border-darkOlive'
                        readOnly 
                        // onChange={(e) => setProductName(e.target.value)}
                    />
                </article>
            </div>

            <div className='flex gap-4'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="accountName" className='font-semibold text-lg'>Ngày tham gia</Label>
                    <Input 
                        id="accountName" 
                        defaultValue={data.date_created}
                        className='cursor-not-allowed bg-white text-darkOlive md:text-lg border border-darkOlive'
                        readOnly 
                        // onChange={(e) => setProductName(e.target.value)}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="accountName" className='font-semibold text-lg'>Số điện thoại</Label>
                    <Input 
                        id="accountName" 
                        defaultValue={data.phone}
                        className='cursor-not-allowed bg-white text-darkOlive md:text-lg border border-darkOlive'
                        readOnly 
                        // onChange={(e) => setProductName(e.target.value)}
                    />
                </article>
            </div>
        </section>
    )
}

export default MyAccountInfo