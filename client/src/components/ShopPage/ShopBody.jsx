import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getDetailedVariations } from '@/hooks/productAPI.jsx'

// {
//     "product_id": "1810f4b8-880e-4784-a800-0836048a0628",
//     "product_name": "Matcha Latte",
//     "description": "I shoudn't be here, I'm not even coffee fhklakjw",
//     "image_url": "https://res.cloudinary.com/dwuszt3qn/image/upload/v1740844795/warxjuvana0ujcs4mtot.webp",
//     "roast_id": 2,
//     "type_id": 1,
//     "aroma_id": 1,
//     "Roast_Level": {
//         "roast_lvl": "Rang trung bình nhẹ"
//     },
//     "Product_Type": {
//         "type_name": "Hỗn hợp"
//     },
//     "Aroma": {
//         "aroma_name": "Hương trái cây"
//     },
//     "Product_Weight": [
//         {
//             "pw_id": "20bae8cc-e1b7-471a-a47c-d5e64109fa8a",
//             "product_price": 25,
//             "qty_in_stock": 48,
//             "weight_id": 1,
//             "product_id": "1810f4b8-880e-4784-a800-0836048a0628",
//             "Weight_Option": {
//                 "weight_id": 1,
//                 "weight_name": "250g"
//             }
//         },
//         {
//             "pw_id": "5b3e2302-f43a-4d9b-b894-572fa16a7276",
//             "product_price": 50,
//             "qty_in_stock": 18,
//             "weight_id": 2,
//             "product_id": "1810f4b8-880e-4784-a800-0836048a0628",
//             "Weight_Option": {
//                 "weight_id": 2,
//                 "weight_name": "500g"
//             }
//         },
//         {
//             "pw_id": "e51827d3-434c-4c63-89b4-6b5e2eab1750",
//             "product_price": 100,
//             "qty_in_stock": 91,
//             "weight_id": 3,
//             "product_id": "1810f4b8-880e-4784-a800-0836048a0628",
//             "Weight_Option": {
//                 "weight_id": 3,
//                 "weight_name": "1000g"
//             }
//         }
//     ]
// }

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