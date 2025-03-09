import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { getOrderStatuses } from '@/hooks/productAPI';
import PropTypes from 'prop-types';

export function EditForm({ order, onSubmit, isLoading }) {
    const [statusId, setStatusId] = useState(order.status_id.toString());
    const [statuses, setStatuses] = useState([]);

    React.useEffect(() => {
        getOrderStatuses(setStatuses);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(order.order_id, { status: parseInt(statusId) });
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <section className='grid gap-5'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_id">ID đơn hàng</Label>
                    <Input 
                        id="order_id" 
                        value={order.order_id}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_date">Ngày đặt hàng</Label>
                    <Input 
                        id="order_date" 
                        value={new Date(order.order_date).toLocaleDateString()}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_total">Tổng tiền (VNĐ)</Label>
                    <Input 
                        id="order_total" 
                        value={order.order_total.toLocaleString()}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="status_id">Trạng thái</Label>
                    <select
                        id="status_id"
                        value={statusId}
                        onChange={(e) => setStatusId(e.target.value)}
                    >
                        <option value="">Chọn trạng thái</option>
                        {statuses.map((s) => (
                            <option key={s.status_id} value={s.status_id}>{s.status_name}</option>
                        ))}
                    </select>
                </article>
            </section>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
        </form>
    );
}

EditForm.propTypes = {
    order: PropTypes.shape({
        order_id: PropTypes.number.isRequired,
        status_id: PropTypes.number.isRequired,
        order_date: PropTypes.string.isRequired,
        order_total: PropTypes.number.isRequired,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};   
