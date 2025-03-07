import React from "react";
import PropTypes from "prop-types";

export function ViewDetails({ discount }) {
    // Example data of discount:
    /*
    {
            "discount_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
            "discount_code": "DISCOUNT2022",
            "description": "10% off on all items",
            "start_date": "2022-01-01",
            "end_date": "2022-12-31",
            "discount_percentage": 10,
            "status": "Active",
            "applied_products": [
                    {
                            "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
                            "product_name": "Cà phê 1"
                    },
                    {
                            "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
                    }
                    
                    ViewDetails.propTypes = {
                        discount: PropTypes.shape({
                            discount_id: PropTypes.string.isRequired,
                            discount_code: PropTypes.string.isRequired,
                            description: PropTypes.string.isRequired,
                            start_date: PropTypes.string.isRequired,
                            end_date: PropTypes.string.isRequired,
                            discount_percentage: PropTypes.number.isRequired,
                            status: PropTypes.string.isRequired,
                            applied_products: PropTypes.arrayOf(
                                PropTypes.shape({
                                    product_id: PropTypes.string.isRequired,
                                    product_name: PropTypes.string.isRequired,
                                })
                            ).isRequired,
                        }).isRequired,
                    };
                    }
            ]
    }
    */
    return (
        <section className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 items-start">
            <article className="grid gap-2">
                <div className="flex">
                    <h3 className="font-semibold pr-2">ID khuyến mãi: </h3>
                    <p>{discount.discount_id}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Mã khuyến mãi: </h3>
                    <p>{discount.discount_code}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Mô tả: </h3>
                    <p>{discount.description}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ngày bắt đầu: </h3>
                    <p>{discount.start_date}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Ngày kết thúc: </h3>
                    <p>{discount.end_date}</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Phần trăm giảm giá: </h3>
                    <p>{discount.discount_percentage}%</p>
                </div>
                <div className="flex">
                    <h3 className="font-semibold pr-2">Trạng thái: </h3>
                    <p>{discount.status}</p>
                </div>
            </article>
            <article className="grid gap-2">
                <h3 className="font-semibold">Sản phẩm áp dụng:</h3>
                {discount.applied_products.map((product, index) => (
                    <div key={index} className="flex">
                        <p className="pr-2">{product.product_name}</p>
                    </div>
                ))}
            </article>
        </section>
    );
}
