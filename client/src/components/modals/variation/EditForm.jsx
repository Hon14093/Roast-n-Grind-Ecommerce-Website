import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { editVariation } from '@/hooks/productAPI';

export function EditForm({ variation, onClose, onSubmitSuccess }) {
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState();
    const [qty, setQty] = useState(variation.qty_in_stock);

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {    
            const new_variation = {
                product_price: parseInt(price),
                qty_in_stock: parseInt(qty)
            }

            console.log("Edit variation data:", new_variation);

            const result = await editVariation(variation.pw_id, new_variation);
            if (result.data.success) {
                onSubmitSuccess();
                onClose();
            }
            console.log("Edit variation result:", result);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmitEdit} className="mx-auto gap-5 grid">
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
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </article>

                <article className="grid w-full items-center gap-1.5">
                    <Label htmlFor="qty_in_stock">Số lượng trong kho</Label>
                    <Input 
                        id="qty_in_stock" 
                        placeholder="Số lượng trong kho" 
                        defaultValue={variation.qty_in_stock}
                        onChange={(e) => setQty(e.target.value)}
                        // type="number"
                    />
                </article>

            </section>

            <Button type="submit" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
            

        </form>
    )
}
