import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import AboutUsBody from '../components/AboutUsPage/AboutUsBody'

function AboutUsPage() {
    return (
        <>
            <div className='text-black'>

                <Header />

                <main>
                    <AboutUsBody />
                </main>

                <Footer theme={'bg-primaryGreen'} />
            </div>
        
        </>
    )
}

export default AboutUsPage