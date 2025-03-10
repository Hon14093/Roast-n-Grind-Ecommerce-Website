import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from "flowbite-react";

function HeroSection() {
    return (
        <article className='relative'>
            <div className='bg-primaryGreen overflow-hidden min-h-[500px] h-[100vh] relative' >
                <div id="imageBG"></div> 

                <div className='absolute inset-0 flex flex-col justify-end p-10 content-start flex-wrap text-left gap-4'>

                    <div className='sticky bottom-0 grid grid-cols-2 font-serifs font-extralight w-full'>
                        <div className='text-white flex flex-col uppercase'>
                            <span className='font-courier leading-[18px]'>Roast & Grind</span>
                            <span className='text-[48px] leading-[60px]'>
                                BREW PERFECTION,
                            </span>
                            <span className='text-[48px] leading-[60px]'>
                                ONE BEAN AT A TIME
                            </span>

                            <div className='h-full self-start text-black items-start bg-bgColor rounded-xl uppercase'>
                                <a href='/' className='rounded-xl h-14 w-60 font-courier flex flex-wrap justify-center content-center hover:text-white hover:bg-brown transition-all duration-300'>
                                    Take a look!
                                </a>
                            </div>
                        </div>

                        <div href='/' className='rounded-xl bg-bgColor h-24 w-[21rem] font-courier self-end justify-self-end'>
                            <Carousel leftControl=' ' rightControl=' ' indicators={false}>
                                <span className='flex flex-col items-start justify-center px-5 gap-1'>
                                    <div className='font-bold'>Free shipping for $50 order</div>
                                    <Link to="/Shop" className='flex gap-2 hover:text-black no-underline group'>
                                        <span>Shop Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 pt-1 transform transition-transform duration-300 group-hover:translate-x-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </Link>
                                </span>

                                <span className='flex flex-col items-start justify-center px-5 gap-1'>
                                    <div className='font-bold'>Earn points to get rewards!</div>
                                    <a href='/' className='flex gap-2 hover:text-black no-underline group'>
                                        <span>Join Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 pt-1 transform transition-transform duration-300 group-hover:translate-x-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </a>
                                </span>

                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default HeroSection