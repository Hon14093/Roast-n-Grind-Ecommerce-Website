import React, { useEffect, useState } from 'react'
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/layout/Cart';
import AccountBody from '@/components/AccountPage/AccountBody';

function AccountPage() {
    
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className='text-darkOlive'>
            <Cart isOpen={isOpen} toggleCart={toggleCart} />
            <Header toggleCart={toggleCart}/>
            
            <main className='px-10 relative min-h-screen bg-darkOlive z-10 text-ivory'>
                <AccountBody />
            </main>

            {/* <Footer /> */}

        </div>
    )
}

export default AccountPage