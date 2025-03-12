import React from "react";
import PropTypes from "prop-types";

export function ViewDetails({ discount }) {
    return (
        <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start">
            <article className="grid gap-2">
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID khuyến mãi:</h3>
                    <p>{discount.discount_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Mã khuyến mãi:</h3>
                    <p>{discount.discount_code || "N/A"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Giá trị giảm giá:</h3>
                    <p>{discount.discount_value || "0"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Số tiền giảm tối đa:</h3>
                    <p>{discount.max_discount_amount || "0"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Số tiền đơn tối thiểu:</h3>
                    <p>{discount.min_order_amount || "0"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ngày bắt đầu:</h3>
                    <p>{discount.start_date ? new Date(discount.start_date).toLocaleDateString() : "N/A"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ngày kết thúc:</h3>
                    <p>{discount.end_date ? new Date(discount.end_date).toLocaleDateString() : "N/A"}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Trạng thái:</h3>
                    <p>{discount.is_active ? "Kích hoạt" : "Không kích hoạt"}</p>
                </div>
            </article>
        </section>
    );
}

ViewDetails.propTypes = {
    discount: PropTypes.shape({
        discount_id: PropTypes.string.isRequired,
        discount_code: PropTypes.string,
        discount_value: PropTypes.number,
        max_discount_amount: PropTypes.number,
        min_order_amount: PropTypes.number,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        is_active: PropTypes.bool,
    }).isRequired,
};