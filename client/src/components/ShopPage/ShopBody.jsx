import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getDetailedVariations } from '@/hooks/productAPI.jsx'

// {
//     "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
//     "product_name": "Custom Roast Coffee Beans - Kaneko Lumi Inspired",
//     "description": "A sweet and creamy caramel coffee drink",
//     "image_url": "https://res.cloudinary.com/dwuszt3qn/image/upload/v1740876735/u9jbv2p0nbrwbwn2amms.webp",
//     "roast_level": "Rang nhẹ vừa",
//     "type_name": "Hỗn hợp",
//     "aroma_name": "Hương trái cây",
//     "variations": [
//         {
//             "pw_id": "269f13a6-3423-41e9-9ae0-16052269fcc6",
//             "weight_id": 1,
//             "weight_name": "250g",
//             "price": 49.999,
//             "stock": 99
//         },
//         {
//             "pw_id": "c3292e51-4da9-4c3f-9a52-9153caf4fcb8",
//             "weight_id": 2,
//             "weight_name": "500g",
//             "price": 79.999,
//             "stock": 99
//         },
//         {
//             "pw_id": "f8c0fdea-1c2d-45e9-86ac-26ef8652a0c1",
//             "weight_id": 3,
//             "weight_name": "1000g",
//             "price": 149.999,
//             "stock": 99
//         }
//     ]
// },

function ShopBody() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        getDetailedVariations(setProducts);
    }, []);

    const handleSearch = () => {
        const results = products.filter(product =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        );

        if (results.length === 0) {
            toast("Không tìm thấy sản phẩm");
        }

        setFilteredProducts(results);
    };

    return (
        <div className="h-fit p-8 pt-4 text-darkOlive">
            <section className='mb-5 flex w-1/2 mx-auto rounded-l-none'>
                <Input
                    className='border border-darkOlive'
                    placeholder='Tìm kiếm sản phẩm'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button className='bg-darkOlive text-ivory' onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </section>

            {/* Below is dynamic search without search button */}
            {/* <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.product_id} product={product} />
                    ))
                ) : (
                    <p className="text-center min-h-[50vh] col-span-3">Không tìm thấy sản phẩm</p>
                )}
            </section> */}
        </div>

    )
}

export default ShopBody