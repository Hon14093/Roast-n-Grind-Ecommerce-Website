import React from 'react'
import { useState } from 'react'
import Header from '../components/layout/Header'
import SignupBody from '../components/AuthPages/SignupBody'
import Cart from '@/components/layout/Cart'

function SignupPage() {
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
                    <SignupBody />
                </main>

            </div>
        
        </>
    )
}

export default SignupPage