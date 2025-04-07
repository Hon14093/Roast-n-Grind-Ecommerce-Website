import React from 'react'
import HeroSection from './HeroSection'
import FeaturedProductsSection from './FeaturedProductsSection'
import StorySection from './StorySection'

function HomeBody() {
    return (
        <>
        <section className='w-full relative'>

            <HeroSection />

            <FeaturedProductsSection />
            
        </section>
        </>
        
    )
}

export default HomeBody