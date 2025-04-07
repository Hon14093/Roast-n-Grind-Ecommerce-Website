import React, { useEffect, useState } from 'react'
import logoWhite from '../../images/white.png'
import ProductCard from '../ShopPage/ProductCard'
import { getPopularProducts } from '@/hooks/productAPI';
// import lumiCoffee from '../../images/Lumi.png'

function FeaturedProductsSection() {
    const [popularProducts, setPopularProducts] = useState([0]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getPopularProducts(setPopularProducts, setLoading);
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (popularProducts.length === 0) return <div>No popular products found</div>;


    return (
        <article className='relative z-[1] text-[48px]'>
            <div className="text-ivory body-font bg-ivory">

                {/* <div className='pt-10 flex justify-center bg-ivory popular'>
                    <h1 className='font-greatVibes italic text-7xl bg-darkOlive pt-7 pb-4 px-16 border rounded-full'>
                        <span>Sản</span>
                        <span className='ml-10'>Phẩm</span>
                        <span className='ml-10'>Phổ</span>
                        <span className='ml-10'>Biến</span>
                    </h1>
                </div> */}

                <div className='pt-10 bg-ivory popular'>
                    <h1>
                        SẢN PHẨM PHỔ BIẾN
                    </h1>
                </div>

                
                {/* <div className="container px-5 pb-20 pt-8 mx-auto bg-ivory">
                    <div className="flex flex-wrap -mt-4 -mb-2">
                        
                        <button className="md:w-1/3 p-2">
                            <div className="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div className="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 className="text-xl mb-2">
                                        Guatemala Ayarza Natural
                                    </h1>
                                    <span className='text-xl block'>
                                        $25
                                    </span>
                                </div>
                                
                            </div>
                        </button>

                        <button className="md:w-1/3 p-2">
                            <div className="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div className="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 className="text-xl mb-2">
                                        Guatemala Ayarza Natural
                                    </h1>
                                    <span className='text-xl block'>
                                        $25
                                    </span>
                                </div>
                                
                            </div>
                        </button>

                        <button className="md:w-1/3 p-2">
                            <div className="h-fit border-2 border-darkOlive border-opacity-60 rounded-2xl overflow-hidden poping-out-card ">
                                <img className='w-full object-cover object-center rounded-b-md -mt-12' src="https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/64372ed7017bd8e771bcd3fe2568299b94838b5b-3000x3000.png&w=1400" alt="" />

                                <div className="-mt-12 pb-5 font-serifs text-center text-darkOlive bg-second_bg_color">
                                    <h1 className="text-xl mb-2">
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
                </div> */}

                <div className="grid grid-cols-3 gap-6 max-w-[75%] mx-auto pt-8">
                    {popularProducts.map((product) => (
                        // <div>{product.product_id}</div>
                        <ProductCard key={product.product_id} product={product} />
                    ))}

                    
                </div>

                <div className='max-w-[75%] mx-auto pb-20'>
                    <button className='big-action-button font-bold w-full text-ivory'>
                        Shop All Coffee
                    </button>
                </div>
            </div>

        </article>
    )
}

export default FeaturedProductsSection