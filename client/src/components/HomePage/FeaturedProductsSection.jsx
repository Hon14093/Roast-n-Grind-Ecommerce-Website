import React from 'react'
import logoWhite from '../../images/white.png'
// import lumiCoffee from '../../images/Lumi.png'

function FeaturedProductsSection() {
    return (
        <article className='relative z-[1] text-[48px]'>
            {/* BREW PERFECTION,
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img src="https://cdn.sanity.io/images/4t60hegj/production/18721882ff8c9b0e8f97e7abf15777e3df020bb6-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/18721882ff8c9b0e8f97e7abf15777e3df020bb6-3000x3000.png&w=1400" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                    <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
            </div>   */}
            

            <div class="text-ivory body-font">

                <div className='pt-14'>
                    
                    {/* <h1 className='pt-7 pb-2 px-12 text-7xl font-greatVibes italic w-fit mx-auto rounded-3xl bg-darkOlive'>
                        Featured Products 
                    </h1> */}
                    
                    <h1 className='ribbon-heading font-greatVibes italic text-7xl'>
                        <span>Sản</span>
                        <span className='ml-10'>Phẩm</span>
                        <span className='ml-10'>Phổ</span>
                        <span className='ml-10'>Biến</span>
                    </h1>

                </div>

                
                <div class="container px-5 pb-20 pt-8 mx-auto">
                    <div class="flex flex-wrap -mt-4 -mb-2">
                        
                        <button class="md:w-1/3 p-2">
                            <div class="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div class="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 class="text-xl mb-2">
                                        Guatemala Ayarza Natural
                                    </h1>
                                    <span className='text-xl block'>
                                        $25
                                    </span>
                                </div>
                                
                            </div>
                        </button>

                        <button class="md:w-1/3 p-2">
                            <div class="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div class="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 class="text-xl mb-2">
                                        Guatemala Ayarza Natural
                                    </h1>
                                    <span className='text-xl block'>
                                        $25
                                    </span>
                                </div>
                                
                            </div>
                        </button>

                        <button class="md:w-1/3 p-2">
                            <div class="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div class="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 class="text-xl mb-2">
                                        Guatemala Ayarza Natural
                                    </h1>
                                    <span className='text-xl block'>
                                        $25
                                    </span>
                                </div>
                                
                            </div>
                        </button>
                        
                    </div>

                    <div>
                        <button className='big-action-button w-full text-ivory'>
                            Shop All Coffee
                        </button>
                    </div>
                </div>

                
            </div>

        </article>
    )
}

export default FeaturedProductsSection