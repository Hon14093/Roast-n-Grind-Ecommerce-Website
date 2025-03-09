import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getOrderDetails } from '@/hooks/productAPI'

export function ViewDetails({ order }) {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        getOrderDetails(order.order_id, setDetails);
    }, [order.order_id]);

    return (
        <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start">
            <article className="grid gap-2">
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID đơn hàng:</h3>
                    <p>{order.order_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ngày đặt hàng:</h3>
                    <p>{new Date(order.order_date).toLocaleString()}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Tổng tiền:</h3>
                    <p>{order.order_total.toLocaleString()} VNĐ</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ghi chú:</h3>
                    <p>{order.note || "N/A"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID tài khoản:</h3>
                    <p>{order.account_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID vận chuyển:</h3>
                    <p>{order.shipping_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID trạng thái:</h3>
                    <p>{order.status_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID mã giảm giá:</h3>
                    <p>{order.discount_id || "N/A"}</p>
                </div>
            </article>
            <article className="grid gap-2">
                <h3 className="font-semibold">Chi tiết đơn hàng:</h3>
                {details.length > 0 ? (
                    details.map((detail) => (
                        <div key={detail.od_id} className="flex">
                            <p className="pr-2">{detail.pw_id} (Ground: {detail.is_ground ? "Yes" : "No"})</p>
                            <p className="pr-2">x{detail.quantity}</p>
                            <p>{detail.subtotal.toLocaleString()} VNĐ</p>
                        </div>
                    ))
                ) : (
                    <p>Không có chi tiết đơn hàng</p>
                )}
            </article>
        </section>
    );
}

ViewDetails.propTypes = {
    order: PropTypes.shape({
        order_id: PropTypes.string.isRequired,
        order_date: PropTypes.string,
        order_total: PropTypes.number,
        note: PropTypes.string,
        account_id: PropTypes.string,
        shipping_id: PropTypes.number,
        status_id: PropTypes.number,
        discount_id: PropTypes.string,
    }).isRequired,
};