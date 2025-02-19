import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AboutUsBody from '../components/AboutUsPage/AboutUsBody'

function AboutUsPage() {
    return (
        <>
            <div className='text-darkOlive'>

                <Header />

                <main className='px-10 relative bg-darkOlive z-10'>
                    <AboutUsBody />
                </main>

                <Footer theme={'bg-primaryGreen'} />
            </div>
        
        </>
    )
}

export default AboutUsPage