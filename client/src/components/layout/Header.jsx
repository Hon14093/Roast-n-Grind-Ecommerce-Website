import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../../images/white.png'
import logoBlack from '../../images/orange.png'

function Header() {
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
            if (scrollTop > lastScrollTop) {
                setScrollDirection('down');
            } else {
                setScrollDirection('up');
            }

            if (window.scrollY === 0) {
                setIsTop(true);
            } else {
                setIsTop(false);
            }
    
            setLastScrollTop(scrollTop);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [lastScrollTop]);

    return (
        <header className={`
            ${scrollDirection === 'down' ? 'hiddenTrans' : 'visibleTrans'} ${isTop ? 'clearBG' : 'coloredBG'}
            client-header
            `
        }>
            <div className='flex gap-4 justify-between items-center p-4 relative font-bold'>
                {/* logo section */}
                <section>
                    <a href="/">
                        <img src={`${isTop ? logoWhite : logoBlack}`} className='w-24' />
                    </a>
                </section>

                {/* navigation section */}
                <section className='absolute left-1/2 transform -translate-x-1/2 font-bold'>
                    <ul className='flex gap-8'>
                        <li className='navList group'>
                            <Link to="/shop">
                                <a className='navAnchor'>Shop</a>
                            </Link>
                        </li>
                        <li className='navList group'>
                            <Link to="/about">
                                <a className='navAnchor'>Giới Thiệu</a>
                            </Link>
                        </li>
                        <li className='navList group'>
                            <a className='navAnchor'>Liên Hệ</a>
                        </li>
                        <li className='navList group'>
                            <a className='navAnchor'>FAQ</a>
                        </li>
                    </ul>
                </section>

                {/* account and cart section */}
                <section className='flex items-center gap-4 text-darkOlive'>
                    <Link to="/login" className='p-2 bg-ivory rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    </Link>

                    <button to="/login" className='group top-right-button p-2 bg-ivory rounded-full flex gap-1 items-center'>
                        <p className='px-1'>Cart</p>
                        <p className=" border-[1.5px] rounded-full size-6 border-darkOlive group-hover:border-ivory">0</p>
                    </button>
                </section>   

                {/* <a class="group text-pink-500 transition-all duration-300 ease-in-out" href="#">
                    <span class="bg-left-bottom bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                        This text gets 'underlined' on hover
                    </span>
                </a> */}

            </div>
        </header>
            
        
    )
}

export default Header