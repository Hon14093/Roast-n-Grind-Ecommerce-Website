import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
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

    useEffect(() => {
        getDetailedVariations(setProducts);
    }, [])

    return (
        <div className="h-fit p-8 text-darkOlive">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        // className='h-fit'
                        key={product.product_id}
                        product={product}
                    />
                ))}
            </div>
        </div>

    )
}

export default ShopBody