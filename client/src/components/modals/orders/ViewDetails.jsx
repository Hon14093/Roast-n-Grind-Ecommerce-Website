import React from "react";
export function ViewDetails({ order }) {
// Example data of order:
/*
{
    "order_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
    "order_date": "2022-01-01",
    "total_price": 100000,
    "status": "Đã giao",
    "customer": {
        "customer_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
        "customer_name": "Nguyễn Văn A",
        "phone_number": "0123456789",
        "email": ""
    },
    "order_details": [
        {
            "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
            "product_name": "Cà phê 1",
            "quantity": 1,
            "price": 100000
        },
        {
            "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
            "product_name": "Cà phê 1",
            "quantity": 1,
            "price": 100000
        }
    ]
}
*/
return (
    <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start">
        <article className="grid gap-2">
            <div className="flex">
                <h3 className="font-semibold pr-2">ID đơn hàng: </h3>
                <p>{order.order_id}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Ngày đặt hàng: </h3>
                <p>{order.order_date}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Tổng giá: </h3>
                <p>{order.total_price}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Trạng thái: </h3>
                <p>{order.status}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Tên khách hàng: </h3>
                <p>{order.customer.customer_name}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Số điện thoại: </h3>
                <p>{order.customer.phone_number}</p>
            </div>
            <div className="flex">
                <h3 className="font-semibold pr-2">Email: </h3>
                <p>{order.customer.email}</p>
            </div>
        </article>
        <article className="grid gap-2">
            <h3 className="font-semibold">Chi tiết đơn hàng:</h3>
            {order.order_details.map((detail, index) => (
                <div key={index} className="flex">
                    <p className="pr-2">{detail.product_name}</p>
                    <p className="pr-2">x{detail.quantity}</p>
                    <p>{detail.price}</p>
                </div>
            ))}
        </article>
    </section>
);
}
