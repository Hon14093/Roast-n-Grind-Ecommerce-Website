import React, { useState } from 'react'
import Footer from '@/components/layout/Footer'
import CheckoutBody from '@/components/CheckoutPage/CheckoutBody'

function CheckoutPage() {
    return (
        <div className='text-darkOlive bg-ivory'>
                    
            {/* <Cart isOpen={isOpen} toggleCart={toggleCart} />
            <Header darkBG={false} toggleCart={toggleCart}/> */}

            <main className='px-10 relative min-h-[300px]'>
                <CheckoutBody />
            </main>

            <Footer />
        </div>
    )
}

export default CheckoutPage