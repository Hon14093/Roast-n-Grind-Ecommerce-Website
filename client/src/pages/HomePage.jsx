import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header.jsx'
import HomeBody from '../components/HomePage/HomeBody.jsx'
import Footer from '../components/layout/Footer.jsx'

function HomePage() {

    return (
        <div className='text-darkOlive'>
            <Header />
            <main>
                <HomeBody />
            </main>
            <Footer />

        </div>

    )
}

export default HomePage