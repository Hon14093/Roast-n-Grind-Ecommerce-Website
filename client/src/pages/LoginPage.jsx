import React from 'react'
import { useState } from 'react';
import Header from '../components/layout/Header'
import LoginBody from '../components/AuthPages/LoginBody'
import Cart from '@/components/layout/Cart';

function LoginPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className='text-darkOlive'>

                <Cart isOpen={isOpen} toggleCart={toggleCart} />
                <Header toggleCart={toggleCart}/>

                <main>
                    <LoginBody />
                </main>

            </div>
        
        </>
    )
}

export default LoginPage