import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function AddForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        discount_code: '',
        discount_value: '',
        max_discount_amount: '',
        min_order_amount: '',
        start_date: '',
        end_date: '',
        is_active: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            discount_code: formData.discount_code,
            discount_value: parseFloat(formData.discount_value) || 0,
            max_discount_amount: parseFloat(formData.max_discount_amount) || 0,
            min_order_amount: parseFloat(formData.min_order_amount) || 0,
            start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
            end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
            is_active: formData.is_active,
        });
        setFormData({
            discount_code: '',
            discount_value: '',
            max_discount_amount: '',
            min_order_amount: '',
            start_date: '',
            end_date: '',
            is_active: false,
        });
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <section className='grid gap-5'>
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_code">Mã giảm giá</Label>
                    <Input 
                        id="discount_code" 
                        placeholder="Mã giảm giá (max 15 ký tự)"
                        value={formData.discount_code}
                        onChange={(e) => setFormData({...formData, discount_code: e.target.value.slice(0, 15)})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_value">Giá trị giảm giá</Label>
                    <Input 
                        id="discount_value" 
                        type="number"
                        placeholder="Giá trị giảm giá"
                        value={formData.discount_value}
                        onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="max_discount_amount">Số tiền giảm tối đa</Label>
                    <Input 
                        id="max_discount_amount" 
                        type="number"
                        placeholder="Số tiền giảm tối đa"
                        value={formData.max_discount_amount}
                        onChange={(e) => setFormData({...formData, max_discount_amount: e.target.value})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="min_order_amount">Số tiền đơn tối thiểu</Label>
                    <Input 
                        id="min_order_amount" 
                        type="number"
                        placeholder="Số tiền đơn tối thiểu"
                        value={formData.min_order_amount}
                        onChange={(e) => setFormData({...formData, min_order_amount: e.target.value})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="start_date">Ngày bắt đầu</Label>
                    <Input 
                        id="start_date" 
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="end_date">Ngày kết thúc</Label>
                    <Input 
                        id="end_date" 
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="is_active">Kích hoạt</Label>
                    <Input 
                        id="is_active" 
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    />
                </article>
            </section>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Đang tạo...' : 'Tạo mới'}
            </Button>
        </form>
    );
}