import React, { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

export function EditForm({ discount }) {
    return (
        <form className="mx-auto gap-5 grid">
            <section className='grid gap-5'>
                
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_id">ID giảm giá</Label>
                    <Input 
                        id="discount_id" 
                        placeholder="ID giảm giá" 
                        defaultValue={discount.discount_id}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_name">Tên giảm giá</Label>
                    <Input 
                        id="discount_name" 
                        placeholder="Tên giảm giá" 
                        defaultValue={discount.discount_name}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_value">Giá trị giảm giá (%)</Label>
                    <Input 
                        id="discount_value" 
                        placeholder="Giá trị giảm giá" 
                        defaultValue={discount.discount_value}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="discount_status">Trạng thái giảm giá</Label>
                    <Input 
                        id="discount_status" 
                        placeholder="Trạng thái giảm giá" 
                        defaultValue={discount.discount_status}
                    />
                </article>

            </section>

            <Button>Lưu thay đổi</Button>

        </form>
    );
}
