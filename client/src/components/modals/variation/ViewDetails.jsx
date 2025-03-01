import React from 'react'

export function ViewDetails({ variation }) {
    return (
        <section className='grid gap-5'>
            <article>
                <div className='flex'>
                    <h3 className='font-semibold pr-2'>ID biến thể: </h3>
                    <p>{variation.pw_id}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Tên sản phẩm: </h3>
                    <p>{variation.Product.product_name}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Cân nặng: </h3>
                    <p>{variation.Weight_Option.weight_name}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Giá sản phẩm: </h3>
                    <p>{variation.product_price} VNĐ</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Số lượng trong kho: </h3>
                    <p>{variation.qty_in_stock}</p>
                </div>
            </article>
        </section>
    )
}
