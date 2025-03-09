import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    fetchDiscounts,
    getOrderStatuses,
    getShippingMethods,
    getAccounts,
    getProductWeights,
    addOrderDetail,
} from '@/hooks/productAPI';



export function AddForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        order_date: '',
        order_total: '',
        note: '',
        account_id: '',
        shipping_id: '',
        status_id: '',
        discount_id: '',
    });
    const [orderDetails, setOrderDetails] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [productWeights, setProductWeights] = useState([]);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    useEffect(() => {
        fetchDiscounts().then((data) => setDiscounts(data || []));
        getOrderStatuses(setStatuses);
        getShippingMethods(setShippingMethods);
        getAccounts(setAccounts);
        getProductWeights(setProductWeights);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            order_date: formData.order_date ? new Date(formData.order_date).toISOString() : new Date().toISOString(),
            order_total: parseFloat(formData.order_total) || 0,
            note: formData.note || null,
            account_id: formData.account_id,
            shipping_id: parseInt(formData.shipping_id) || 1,
            status_id: parseInt(formData.status_id) || 1,
            discount_id: formData.discount_id || null,
        };
        const createdOrder = await onSubmit(order);
        if (createdOrder && orderDetails.length > 0) {
            for (const detail of orderDetails) {
                await addOrderDetail({ ...detail, order_id: createdOrder.order_id });
            }
        }
    };

    const addDetail = (detail) => {
        setOrderDetails([...orderDetails, detail]);
        setFormData({
            ...formData,
            order_total: (parseFloat(formData.order_total) || 0) + detail.subtotal,
        });
        setIsDetailModalOpen(false);
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <section className='grid gap-5'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_date">Ngày đặt hàng</Label>
                    <Input 
                        id="order_date" 
                        type="date"
                        value={formData.order_date}
                        onChange={(e) => setFormData({ ...formData, order_date: e.target.value })}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_total">Tổng tiền (VNĐ)</Label>
                    <Input 
                        id="order_total" 
                        type="number"
                        placeholder="Tổng tiền"
                        value={formData.order_total}
                        disabled // Tự động tính từ Order_Details
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="note">Ghi chú</Label>
                    <Textarea 
                        id="note" 
                        placeholder="Ghi chú"
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="account_id">Tài khoản</Label>
                    <select
                        id="account_id"
                        value={formData.account_id}
                        onChange={(e) => setFormData({ ...formData, account_id: e.target.value })}
                    >
                        <option value="">Chọn tài khoản</option>
                        {accounts.map((a) => (
                            <option key={a.account_id} value={a.account_id}>{a.account_name}</option>
                        ))}
                    </select>
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="shipping_id">Phương thức vận chuyển</Label>
                    <select
                        id="shipping_id"
                        value={formData.shipping_id}
                        onChange={(e) => setFormData({ ...formData, shipping_id: e.target.value })}
                    >
                        <option value="">Chọn phương thức</option>
                        {shippingMethods.map((m) => (
                            <option key={m.shipping_id} value={m.shipping_id}>{m.shipping_method}</option>
                        ))}
                    </select>
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="status_id">Trạng thái</Label>
                    <select
                        id="status_id"
                        value={formData.status_id}
                        onChange={(e) => setFormData({ ...formData, status_id: e.target.value })}
                    >
                        <option value="">Chọn trạng thái</option>
                        {statuses.map((s) => (
                            <option key={s.status_id} value={s.status_id}>{s.status_name}</option>
                        ))}
                    </select>
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_id">Mã giảm giá</Label>
                    <select
                        id="discount_id"
                        value={formData.discount_id}
                        onChange={(e) => setFormData({ ...formData, discount_id: e.target.value })}
                    >
                        <option value="">Chọn mã giảm giá</option>
                        {discounts.map((d) => (
                            <option key={d.discount_id} value={d.discount_id}>{d.discount_code}</option>
                        ))}
                    </select>
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label>Chi tiết đơn hàng</Label>
                    <Button type="button" onClick={() => setIsDetailModalOpen(true)}>Thêm sản phẩm</Button>
                    {orderDetails.length > 0 && (
                        <ul>
                            {orderDetails.map((detail, index) => (
                                <li key={index}>
                                    {detail.pw_id} - Số lượng: {detail.quantity} - Subtotal: {detail.subtotal}
                                </li>
                            ))}
                        </ul>
                    )}
                </article>
            </section>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo đơn hàng'}
            </Button>

            {/* Modal thêm chi tiết đơn hàng */}
            {isDetailModalOpen && (
                <OrderDetailsForm
                    productWeights={productWeights}
                    onSubmit={addDetail}
                    onClose={() => setIsDetailModalOpen(false)}
                />
            )}
        </form>
    );
}