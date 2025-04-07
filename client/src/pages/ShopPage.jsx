import React, { useState, useEffect } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ShopBody from '@/components/ShopPage/ShopBody'
import Cart from '@/components/layout/Cart'
import { Toaster } from '@/components/ui/sonner'

function ShopPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };    

    return (
        <>
            <div className='text-darkOlive bg-ivory'>
            
                <Cart isOpen={isOpen} toggleCart={toggleCart} />
                <Header darkBG={false} toggleCart={toggleCart}/>

                <main className='px-10 relative pt-20'>
                    <ShopBody />
                    <Toaster />
                </main>

                <Footer />
            </div>
        </>
    )
}

export default ShopPage