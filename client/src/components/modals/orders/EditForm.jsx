import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

export function EditForm({ order }) {

    return (
        <form className="mx-auto gap-5 grid">
            <section className='grid gap-5'>
                
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_id">ID đơn hàng</Label>
                    <Input 
                        id="order_id" 
                        placeholder="ID đơn hàng" 
                        defaultValue={order.order_id}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="customer_name">Tên khách hàng</Label>
                    <Input 
                        id="customer_name" 
                        placeholder="Tên khách hàng" 
                        defaultValue={order.customer_name}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_total">Tổng đơn hàng (VNĐ)</Label>
                    <Input 
                        id="order_total" 
                        placeholder="Tổng đơn hàng" 
                        defaultValue={order.order_total}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="order_status">Trạng thái đơn hàng</Label>
                    <Input 
                        id="order_status" 
                        placeholder="Trạng thái đơn hàng" 
                        defaultValue={order.order_status}
                    />
                </article>

            </section>

            <Button>Lưu thay đổi</Button>

        </form>
    )
}
