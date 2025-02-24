import React from 'react'

export function ViewDetails({ product }) {
    // Example data of product:
    // {
    //     "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
    //     "product_name": "Cà phê 1",
    //     "description": "I'm coffee 1",
    //     "image_url": "url.com",
    //     "Roast_Level": {
    //         "roast_lvl": "Rang nhẹ"
    //     },
    //     "Product_Type": {
    //         "type_name": "Hỗn hợp"
    //     },
    //     "Aroma": {
    //         "aroma_name": "Hương trái cây"
    //     }
    // }

    return (
        <section className='grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start'>
            <article className='grid gap-2'>
                <div className='flex'>
                    <h3 className='font-semibold pr-2'>ID sản phẩm: </h3>
                    <p>{product.product_id}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Tên sản phẩm: </h3>
                    <p>{product.product_name}</p>
                </div>

                <div>
                    <h3 className='font-semibold pr-2'>Miêu tả: </h3>
                    <p>{product.description}</p>
                </div>

                <div className='grid grid-cols-3 sm:grid-cols-2 gap-5'>
                    <div>
                        <h3 className='font-semibold pr-2'>Độ rang: </h3>
                        <p>{product.Roast_Level.roast_lvl}</p>
                    </div>

                    <div>
                        <h3 className='font-semibold pr-2'>Loại sản phẩm: </h3>
                        <p>{product.Product_Type.type_name}</p>
                    </div>

                    <div>
                        <h3 className='font-semibold pr-2'>Hương vị: </h3>
                        <p>{product.Aroma.aroma_name}</p>
                    </div>
                </div>
            </article>

            <article>
                <h3 className='font-semibold pb-2'>Hình ảnh sản phẩm: </h3>
                <div className='flex justify-center'>
                    <img 
                        src={product.image_url} 
                        alt="Product Preview" 
                        className="w-72 h-72 object-cover rounded-md border"
                    />
                </div>
            </article>
        </section>
    )
}
