import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage1 } from '@/hooks/Cloudinary/cloudinary'
import { addProduct } from '@/hooks/productAPI';

import AromaComboBox from '../../combobox/AromaCombobox';
import ProductTypeComboBox from '../../combobox/ProductTypeComobox';
import RoastLevelComboBox from '../../combobox/RoastLevelCombobox';

export function AddForm({ onSubmitSuccess }) {
    const placeholderImage = "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg";
    const [preview, setPreview] = useState(placeholderImage);
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [aromaValue, setAromaValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [roastValue, setRoastValue] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imageUpload = await uploadImage1(imageFile);

            const product = {
                product_name: productName,
                description: description,
                image_url: imageUpload,
                aroma_id: aromaValue,
                type_id: typeValue,
                roast_id: roastValue,
            };

            const addProductRes = await addProduct(product);
            if (addProductRes.data.success) {
                if (onSubmitSuccess) onSubmitSuccess();
            }
            console.log("Add product response:", addProductRes);

        } catch (error) {
            console.error("Error adding product:", error);            
        }
    
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_name">Tên sản phẩm</Label>
                        <Input 
                            id="product_name" 
                            placeholder="Tên sản phẩm" 
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
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

            <Button type="Submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
            </Button>
        </form>
    )
}