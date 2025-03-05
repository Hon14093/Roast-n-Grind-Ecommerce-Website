import React from 'react'
import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AboutUsBody from '../components/AboutUsPage/AboutUsBody'
import Cart from '@/components/layout/Cart'

function AboutUsPage() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className='text-darkOlive'>

                <Cart isOpen={isOpen} toggleCart={toggleCart} />
                <Header toggleCart={toggleCart}/>

                <main className='px-10 relative bg-darkOlive z-10'>
                    <AboutUsBody />
                </main>

                <Footer theme={'bg-primaryGreen'} />
            </div>
        
        </>
    )
}

export default AboutUsPage