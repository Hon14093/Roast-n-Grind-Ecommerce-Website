import React, { useState } from 'react'
import AromaComboBox from '@/components/combobox/AromaCombobox'
import ProductTypeComboBox from '@/components/combobox/ProductTypeComobox'
import RoastLevelComboBox from '@/components/combobox/RoastLevelCombobox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createDiscount } from '@/hooks/discountAPI'

export default function AddForm({ onSubmitSuccess }) {
    const [discountCode, setDiscountCode] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [minOrder, setMinOrder] = useState(null);
    const [maxDiscount, setMaxDiscount] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
            console.log(data);

            const result = await createDiscount(data);
            if (result.success) {
                onSubmitSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="discount_code">Mã khuyến mãi</Label>
                        <Input 
                            id="discount_code" 
                            placeholder="Mã khuyến mãi" 
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="discount_value">Giá trị (%)</Label>
                        <Input 
                            id="discount_value" 
                            placeholder="vd: 10%, 12%,..." 
                            type="number"
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
                                onChange={(e) => setMinOrder(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="max_discount">Giá trị giảm tối đa</Label>
                            <Input 
                                id="max_discount" 
                                placeholder="vd: 30000, 50000,..." 
                                type="number"
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
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="end_date">Ngày kết thúc</Label>
                            <Input
                                type="datetime-local"
                                id="end_date"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </article>

                    <Button type='submit'>
                        Thêm khuyến mãi
                    </Button>

                </section>
        </form>
    )
}
