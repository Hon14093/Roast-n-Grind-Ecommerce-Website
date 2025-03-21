import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from '@/components/context/AuthContext'
import { CircleUser } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';
import { Power } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { User2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import MyOrders from './MyOrders';
import axios from 'axios';

export default function AccountBody() {
    const { user, logout } = useAuth();
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getAccountInfo = async (account_id) => {
            try {
                const info = await axios.get(`http://localhost:5000/api/auth/info/${account_id}`)
                setAccount(info.data.info);
            } catch (error) {
                console.log(error)
            }
        }

        getAccountInfo(user.account_id)
    }, [user.account_id]);
    
    
    // Extract tab from URL, default to 'account'
    const tab = new URLSearchParams(location.search).get("tab") || "account";

    const handleTabChange = (newTab) => {
        navigate(`?tab=${newTab}`); // Update URL without reloading
    };

    return (
        <>
        <section className='grid place-items-center min-h-screen'>
            <div className='flex w-full gap-8 justify-center'>

                {/* This will contain tabs */}
                <article className=' bg-ivory text-darkOlive h-fit rounded-xl md:w-[25%] xl:w-[20%]'>

                    <div className="mb-4 p-2 rounded-2xl shadow-lg gap-4 font-raleway text-xl">
                        <div className='flex items-center gap-2'>
                            <CircleUser size={60} />
                            {account && <h2 className="font-semibold text-justify">{account.account_name}</h2>}
                        </div>
                        
                        {/* <div>{user.account_id}</div> */}
                    </div>

                    {/* <Separator className='bg-darkOlive mx-auto mb-4' /> */}

                    <nav className="flex flex-col pb-10">
                        <button
                            onClick={() => handleTabChange("account")}
                            className={`p-2 text-left flex gap-2 hover:font-bold duration-150 ${tab === "account" ? "bg-primaryBlue text-ivory" : "bg-ivory text-darkOlive"}`}
                        >
                            <User2 />
                            Thông Tin Tài Khoản
                        </button>
                        <button
                            onClick={() => handleTabChange("address")}
                            className={`p-2 text-left flex gap-2 hover:font-bold duration-150 ${tab === "address" ? "bg-primaryBlue text-ivory" : "bg-ivory text-darkOlive"}`}
                        >
                            <MapPin />
                            Địa Chỉ Của Bạn
                        </button>
                        <button
                            onClick={() => handleTabChange("orders")}
                            className={`p-2 text-left flex gap-2 hover:font-bold duration-150 ${tab === "orders" ? "bg-primaryBlue text-ivory" : "bg-ivory text-darkOlive"}`}
                        >
                            <ShoppingBasket />
                            Đơn Hàng Của Bạn
                        </button>
                    </nav>

                    <Separator className='bg-darkOlive mx-auto my-2 w-[90%]' />

                    <button
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className='p-2 mb-2 text-left flex gap-2 text-red-500 hover:font-bold duration-150'
                    >
                        <Power />
                        Logout
                    </button>
                </article>

                {/* This will render tab content */}
                <article className='bg-darkOlive md:w-[65%] xl:w-[60%]'>
                    <div className='text-center text-ivory text-3xl m-7 font-semibold'>
                        Ngày mới tốt lành!
                    </div>

                    <div className='bg-ivory rounded-xl text-darkOlive p-4'>
                        {tab === "account" && <AccountInfo />}
                        {tab === "address" && <AddressList />}
                        {tab === "orders" && <MyOrders />}
                        {tab === "logout" && <Logout />}
                    </div>
                </article>
            </div>

        </section>

        </>
    )
}

const AccountInfo = () => <div>Thông tin tài khoản</div>;
const AddressList = () => <div>Địa chỉ của bạn</div>;
const Logout = () => <div>Đăng xuất</div>;