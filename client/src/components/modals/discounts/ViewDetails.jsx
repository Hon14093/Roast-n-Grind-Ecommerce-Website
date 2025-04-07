import React from 'react'

export function ViewDetails({ discount }) {
    return (
        <section>
            <article className='grid gap-2'>
                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Mã khuyến mãi: </h3>
                    <p>{discount.discount_code}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Giá trị khuyến mãi: </h3>
                    <p>{discount.discount_value}%</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Giá trị đơn hàng tối thiểu: </h3>
                    <p>{discount.min_order_amount} vnđ</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Giá trị khuyến mãi tối đa: </h3>
                    <p>{discount.max_discount_amount} vnđ</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Ngày bắt đầu: </h3>
                    <p>{new Date(discount.start_date).toLocaleDateString()}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Ngày kết thúc: </h3>
                    <p>{new Date(discount.end_date).toLocaleDateString()}</p>
                </div>

                <div className='flex'>
                    <h3 className='font-semibold pr-2'>Trạng thái: </h3>
                    <p>{discount.is_active ? 'Đang hoạt động' : 'Hết hạn'}</p>
                </div>
            </article>
        </section>
    )
}
