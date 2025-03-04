import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ProductDetailsBody } from '@/components/ProductDetailsPage/ProductDetailsBody'

function ProductDetailsPage() {
    return (
        <>
            <div className='text-darkOlive bg-ivory'>

                <Header darkBG={false} />

                <main className='px-10 relative pt-20'>
                    <ProductDetailsBody />
                </main>

                <Footer />
            </div>
        
        </>
    )
}

export default ProductDetailsPage