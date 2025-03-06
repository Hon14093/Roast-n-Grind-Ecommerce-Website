import React from 'react'
import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ProductDetailsBody } from '@/components/ProductDetailsPage/ProductDetailsBody'
import Cart from '@/components/layout/Cart'

function ProductDetailsPage() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <>
            <div className='text-darkOlive bg-ivory'>

                <Cart isOpen={isOpen} toggleCart={toggleCart} />
                <Header darkBG={false} toggleCart={toggleCart}/>

                <main className='px-10 relative pt-20 z-10'>
                    <ProductDetailsBody />
                </main>

                <Footer />

            </div>        
            
        </>
    )
}

export default ProductDetailsPage