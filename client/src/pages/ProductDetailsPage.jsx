import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ProductDetailsBody } from '@/components/ProductDetailsPage/ProductDetailsBody'
import ShoppingCart from '@/components/layout/ShoppingCart'

function ProductDetailsPage() {
    return (
        <>
            <div className='text-darkOlive bg-ivory'>

                <Header darkBG={false} />

                <main className='px-10 relative pt-20 z-10'>
                    <ProductDetailsBody />
                </main>

                <Footer />

            </div>        
            <div className='inset-0 z-50'>
                <ShoppingCart />
            </div>
        </>
    )
}

export default ProductDetailsPage