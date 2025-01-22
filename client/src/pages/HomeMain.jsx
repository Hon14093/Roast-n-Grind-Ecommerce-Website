import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import FeaturedProductsSection from '../components/HomePage/FeaturedProductsSection'
import StorySection from '../components/HomePage/StorySection'

function HomeMain() {
    return (
        <>
        <section className='w-full relative'>

            <HeroSection />

            <FeaturedProductsSection />

            <StorySection />

            {/* Reviews Section ? */}
            <article>

            </article>
            
        </section>
        </>
        
    )
}

export default HomeMain