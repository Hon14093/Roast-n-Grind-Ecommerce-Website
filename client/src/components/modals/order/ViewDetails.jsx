import { getOrderDetailsData } from '@/hooks/orderAPI';
import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/data-table';
import { orderDetailsColumns } from '@/components/columns';
import { Textarea } from '@/components/ui/textarea';

export default function ViewDetails({ order }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getOrderDetailsData(order.order_id, setData);
    },[])

    return (
        <div className='grid gap-2'>
            {/* <button onClick={() => console.log(data)}>
                Hello
            </button> */}

            <section className='grid grid-cols-2'>
                <article className='grid col-span-1 self-start'>
                    <span className='flex gap-1'>
                        <p className='font-bold'>ID đơn hàng: </p> 
                        {order.order_id}
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Ngày đặt: </p> 
                        {order.order_date}
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Tổng tiền: </p>
                        {order.order_total} vnđ
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Trạng thái: </p>
                        {order.Order_Status.status_name}
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Phương thức vận chuyển: </p>
                        {order.Shipping_Method.shipping_method}
                    </span>
                </article>

                <article className='col-span-1'>
                    <span className='flex gap-1'>
                        <p className='font-bold'>Tài khoản:</p> 
                        {order.Account.account_name}
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Địa chỉ:</p> 
                        <p>{order.Address.last_name} {order.Address.first_name} - {order.Address.address_line}, {order.Address.ward}, {order.Address.district}</p>
                    </span>

                    <span className='flex gap-1'>
                        <p className='font-bold'>Voucher:</p> 
                        {/* (order.Discount.discount_code ) */}
                        {order.Discount ? (
                            order.Discount.discount_code ? (
                                order.Discount.discount_code
                            ) : (
                                <p>Không có</p>
                            )
                        ) : (
                            <p>Không có</p>
                        )}
                    </span>

                    <span className=''>
                        <p className='font-bold'>Ghi chú:</p> 
                        <Textarea defaultValue={order.note} placeholder='Không có ghi chú' disabled />
                    </span>
                </article>
            </section>

            <DataTable 
                columns={orderDetailsColumns}
                data={data}
            />

        </div>
    )
}
