import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { editProduct } from '@/hooks/productAPI'
import { uploadImage, uploadImage1 } from '@/hooks/Cloudinary/cloudinary';

import AromaComboBox from '../../combobox/AromaCombobox';
import ProductTypeComboBox from '../../combobox/ProductTypeComobox';
import RoastLevelComboBox from '../../combobox/RoastLevelCombobox';

export function EditForm({ product, onClose, onSubmitSuccess }) {
    // id, name, description, image, roast, type, aroma
    const [product_name, setProduct_name] = useState();
    const [description, setDescription] = useState();
    const [image_url, setImageURL] = useState();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState();

    const [aromaValue, setAromaValue] = useState(product.aroma_id);
    const [typeValue, setTypeValue] = useState(product.type_id);
    const [roastValue, setRoastValue] = useState(product.roast_id);

    const existingImage = product.image_url;
    const [preview, setPreview] = useState(existingImage);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageUpload = await uploadImage1(imageFile);

            const new_product = {
                product_name: product_name,
                description: description,
                image_url: imageUpload,
                aroma_id: aromaValue,
                type_id: typeValue,
                roast_id: roastValue,
            };

            console.log("Edit product data:", new_product);

            const result = await editProduct(product.product_id, new_product);
            if (result.data.success) {
                onSubmitSuccess();
                onClose();
            }
            console.log("Edit product result:", result);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto gap-5 grid">
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
                            onChange={(e) => setProduct_name(e.target.value)}
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
                            defaultValue={product.description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </article>

                    <AromaComboBox value={aromaValue} onChange={setAromaValue} />
                    
                    <ProductTypeComboBox value={typeValue} onChange={setTypeValue} />

                    <RoastLevelComboBox value={roastValue} onChange={setRoastValue} />

                </section>

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

            <Button type="submit" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>

        </form>
    )
}
