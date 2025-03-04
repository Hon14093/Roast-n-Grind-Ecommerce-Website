import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ShopBody from '@/components/ShopPage/ShopBody'

function ShopPage() {
    return (
        <>
            <div className='text-darkOlive bg-ivory'>

                <Header darkBG={false} />

                <main className='px-10 relative pt-20'>
                    <ShopBody />
                </main>

                <Footer />
            </div>
        
        </>
    )
}

export default ShopPage