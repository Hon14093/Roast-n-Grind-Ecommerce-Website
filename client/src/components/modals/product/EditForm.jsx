import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

export function EditForm({ product }) {
    // id, name, description, image, roast, type, aroma

    const existingImage = "https://cdn.sanity.io/images/4t60hegj/production/55b151b7762f891d2bb4beeba49073902e550078-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/55b151b7762f891d2bb4beeba49073902e550078-3000x3000.png&w=1400"
    const [preview, setPreview] = useState(existingImage);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
        // if needed, the way to restore from uploaeded image 
        // is to setPreview(existingImage) again
    }

    return (
        <form className="mx-auto gap-5 grid">
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_id">ID sản phẩm</Label>
                        <Input 
                            id="product_id" 
                            placeholder="ID sản phẩm" 
                            defaultValue={product.product_id}
                            disabled
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_name">Tên sản phẩm</Label>
                        <Input 
                            id="product_name" 
                            placeholder="Tên sản phẩm" 
                            defaultValue={product.product_name}
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
                            defaultValue={product.description}
                        />
                    </article>

                </section>
                
                {/* <Separator orientation="vertical" className="w-1" /> */}

                <section>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Hình ảnh sản phẩm</Label>
                        <Input 
                            id="picture" 
                            type="file" 
                            accept="image/"
                            onChange={handleImageChange} 
                            className='-py-1' 
                        />

                        {preview && (
                            <div className='flex justify-center'>
                                <img 
                                    src={preview} 
                                    alt="Product Preview" 
                                    className="w-72 h-72 object-cover rounded-md border"
                                />
                            </div>
                        )}
                    </div>
                </section>
            </div>


            <Button>Lưu thay đổi</Button>
        </form>
    )
}
