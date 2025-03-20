import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '@/components/context/AuthContext'
import { Card, CardContent } from '../ui/card';

export default function AccountBody() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => console.log(user));

    return (
        <>
        {/* <section className='grid grid-cols-12'>
            <Card className='col-start-4 col-span-6'>
                <CardContent className='grid py-4'>
                    Hello
                </CardContent>
            </Card>
        </section> */}

        <section className='grid place-items-center min-h-screen '>
            <div className='grid grid-cols-12 w-full gap-8'>
                <article className='col-start-2 col-span-3 bg-ivory text-darkOlive h-96 rounded-xl'>
                    <div>
                        <div>{user.account_id}</div>
                        <button onClick={() => {
                            logout();
                            navigate('/');
                            // location.reload();
                            // setTimeout(() => {
                            //     location.reload();
                            //     console.log('Logged out')
                            // }, 1000)
                        }}>
                            logout
                        </button>
                    </div>

                </article>

                <article className='col-span-7 bg-darkOlive'>
                    <div className='text-center text-ivory text-3xl m-7 font-semibold'>
                        Ngày mới tốt lành!
                    </div>

                    <div className='bg-ivory rounded-xl text-darkOlive p-4'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem error hic, quia doloremque cupiditate autem dolorem aliquid officia earum accusantium quos cumque sunt omnis minima aperiam iusto nostrum quod reprehenderit! Fugit ipsum a minima non perferendis impedit error exercitationem ea, eveniet inventore, explicabo accusamus!
                    </div>
                </article>
            </div>

        </section>


        {/* <div>{user.account_id}</div>
        <button onClick={() => {
            logout();
            navigate('/');
        }}>
            logout
        </button> */}
        </>
    )
}
