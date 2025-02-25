import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/hooks/Cloudinary'



export function AddForm() {
    const [preview, setPreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('picture');
        const file = fileInput.files[0];
        const productName = document.getElementById('product_name').value;
        const productDescription = document.getElementById('product_des').value;
    
        if (!file || !productName || !productDescription) {
            console.error("Vui lòng điền đủ thông tin và chọn ảnh!");
            return;
        }
    
        try {
            const imageUrl = await uploadImage(file);
            if (!imageUrl) {
                console.error("Không thể tải ảnh lên Cloudinary!");
                return;
            }
    
            console.log("URL ảnh đã tải lên:", imageUrl);
    
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: productName,
                    description: productDescription,
                    imageUrl: imageUrl,
                }),
            });
    
            if (response.ok) {
                console.log("Thêm sản phẩm thành công!");
            } else {
                console.error("Thêm sản phẩm thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi tải ảnh lên hoặc thêm sản phẩm:", error);
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setPreview(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>
                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_id">ID sản phẩm</Label>
                        <Input 
                            id="product_id" 
                            placeholder="ID sản phẩm" 
                            disabled
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_name">Tên sản phẩm</Label>
                        <Input 
                            id="product_name" 
                            placeholder="Tên sản phẩm" 
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
                        />
                    </article>
                </section>
                
                <section>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="picture">Hình ảnh sản phẩm</Label>
                        <Input 
                            id="picture" 
                            type="file" 
                            accept="image/*"
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

            <Button type="submit">Thêm sản phẩm</Button>
        </form>
    )
}
