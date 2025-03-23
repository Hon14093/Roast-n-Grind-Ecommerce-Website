import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { updateDiscount } from '@/hooks/discountAPI';

export default function EditForm({ discount, onClose, onSubmitSuccess }) {
    const [discountCode, setDiscountCode] = useState(discount.discount_code);
    const [discountValue, setDiscountValue] = useState(discount.discount_value);
    const [minOrder, setMinOrder] = useState(discount.min_order_amount);
    const [maxDiscount, setMaxDiscount] = useState(discount.max_discount_amount);
    const [startDate, setStartDate] = useState(discount.start_date);
    const [endDate, setEndDate] = useState(discount.end_date);

    const formatDateTimeLocal = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return date.toISOString().slice(0, 16);
    };
    

    const checkActiveDate = () => {
        if (!startDate || !endDate) return false;
    
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        return now >= start && now <= end;    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                discount_code: discountCode.toUpperCase(),
                discount_value: parseFloat(discountValue),
                max_discount_amount: parseFloat(maxDiscount),
                min_order_amount: parseFloat(minOrder),
                start_date: new Date(startDate).toISOString(), 
                end_date: new Date(endDate).toISOString(),  
                is_active: checkActiveDate()
            }

            const update = await updateDiscount(discount.discount_id, data);
            if (update.success) {
                onSubmitSuccess();
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <section className='grid gap-5'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_id">ID khuyến mãi</Label>
                    <Input 
                        id="discount_id" 
                        defaultValue={discount.discount_id}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_code">Mã khuyến mãi</Label>
                    <Input 
                        id="discount_code" 
                        placeholder="Mã sản phẩm" 
                        defaultValue={discount.discount_code}
                        onChange={(e) => setDiscountCode(e.target.value)}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_value">Giá trị khuyến mãi</Label>
                    <Input 
                        id="discount_value" 
                        placeholder="giá trị sản phẩm" 
                        defaultValue={discount.discount_value}
                        onChange={(e) => setDiscountValue(e.target.value)}
                    />
                </article>

                <article className='flex gap-4'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="min_order">Giá trị đơn hàng tối thiểu</Label>
                        <Input 
                            id="min_order" 
                            placeholder="vd: 10000, 120000,..." 
                            type="number"
                            defaultValue={discount.min_order_amount}
                            onChange={(e) => setMinOrder(e.target.value)}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="max_discount">Giá trị giảm tối đa</Label>
                        <Input 
                            id="max_discount" 
                            placeholder="vd: 30000, 50000,..." 
                            type="number"
                            defaultValue={discount.max_discount_amount}
                            onChange={(e) => setMaxDiscount(e.target.value)}
                        />
                    </div>
                </article>

                <article className='flex gap-4'>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="start_date">Ngày bắt đầu</Label>
                        <Input
                            type="datetime-local"
                            id="start_date"
                            defaultValue={discount.start_date ? formatDateTimeLocal(discount.start_date) : ""}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="end_date">Ngày kết thúc</Label>
                        <Input
                            type="datetime-local"
                            id="end_date"
                            defaultValue={discount.end_date ? formatDateTimeLocal(discount.end_date) : ""}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                    </div>
                </article>

                <Button type='submit'>
                    Cập nhật
                </Button>
            </section>
        </form>
    )
}
