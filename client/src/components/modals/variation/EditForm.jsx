import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'

export function EditForm({ variation }) {

    return (
        <form className="mx-auto gap-5 grid">
            <section className='grid gap-5'>
                
                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="pw_id">ID biến thể</Label>
                    <Input 
                        id="pw_id" 
                        placeholder="ID biến thể" 
                        defaultValue={variation.pw_id}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_name">Tên sản phẩm</Label>
                    <Input 
                        id="product_name" 
                        placeholder="Tên sản phẩm" 
                        defaultValue={variation.Product.product_name}
                        disabled
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="product_price">Giá sản phẩm (VNĐ)</Label>
                    <Input 
                        id="product_price" 
                        placeholder="Giá sản phẩm" 
                        defaultValue={variation.product_price}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="qty_in_stock">Số lượng trong kho</Label>
                    <Input 
                        id="qty_in_stock" 
                        placeholder="Số lượng trong kho" 
                        defaultValue={variation.qty_in_stock}
                        type="number"
                    />
                </article>

            </section>

            <Button>Lưu thay đổi</Button>

        </form>
    )
}
