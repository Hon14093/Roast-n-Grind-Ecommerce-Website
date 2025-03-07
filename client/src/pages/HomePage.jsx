import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header.jsx'
import HomeBody from '../components/HomePage/HomeBody.jsx'
import Footer from '../components/layout/Footer.jsx'
import Cart from '@/components/layout/Cart.jsx'

function HomePage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='text-darkOlive'>
            <Cart isOpen={isOpen} toggleCart={toggleCart} />
            <Header toggleCart={toggleCart}/>
            <main>
                <HomeBody />
            </main>
            <Footer />

        </div>

    )
}

export default HomePage