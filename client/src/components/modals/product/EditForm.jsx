import React from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function EditForm({ product }) {
    // id, name, description, image, roast, type, aroma

    return (
        <form class="mx-auto gap-5 grid">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="product_id">ID sản phẩm</Label>
                <Input 
                    id="product_id" 
                    placeholder="ID sản phẩm" 
                    defaultValue={product.product_id}
                    disabled
                />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="product_name">Tên sản phẩm</Label>
                <Input 
                    id="product_name"
                    placeholder="Tên sản phẩm" 
                    defaultValue={product.product_name}
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="product_name">Miêu tả</Label>
                <Textarea 
                    id="product_name" 
                    placeholder="Miêu tả" 
                    defaultValue={product.product_description}
                />
            </div>


            <Button>Submit</Button>
        </form>
    )
}
