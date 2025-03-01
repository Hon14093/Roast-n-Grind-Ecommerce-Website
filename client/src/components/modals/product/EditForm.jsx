import React, { useState } from 'react'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { editProduct } from '@/hooks/productAPI'
import { uploadImage } from '@/hooks/Cloudinary/cloudinary';

const aromas = [
    { value: "chocolate", label: "Chocolate" },
    { value: "vanilla", label: "Vanilla" },
];
const types = [
    { value: "arabica", label: "Arabica" },
    { value: "robusta", label: "Robusta" },
];
const roast_lvls = [
    { value: "light", label: "Light Roast" },
    { value: "dark", label: "Dark Roast" },
];

export function EditForm({ product, onClose, onSubmitSuccess }) {
    // id, name, description, image, roast, type, aroma
    const [product_name, setProduct_name] = useState();
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState(false);

    const [aromaOpen, setAromaOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [roastOpen, setRoastOpen] = useState(false);

    const [aromaValue, setAromaValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [roastValue, setRoastValue] = useState('');

    const selectedAroma = aromas.find((aroma) => aroma.value === aromaValue);
    const selectedType = types.find((type) => type.value === typeValue);
    const selectedRoast = roast_lvls.find((roast) => roast.value === roastValue);

    const existingImage = "https://cdn.sanity.io/images/4t60hegj/production/55b151b7762f891d2bb4beeba49073902e550078-3000x3000.png?auto=format&q=75&url=https://cdn.sanity.io/images/4t60hegj/production/55b151b7762f891d2bb4beeba49073902e550078-3000x3000.png&w=1400"
    const [preview, setPreview] = useState(existingImage);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(file);

            try {
                const imageResult = await uploadImage(e, file)
                console.log("Image result:", imageResult);
            } catch (error) {
                console.error("Upload image failed:", error);
            }
        }
        // if needed, the way to restore from uploaeded image 
        // is to setPreview(existingImage) again
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            product_name,
            description,
            // image_url
        }

        const result = await editProduct(product.product_id, data);
        if (result) {
            onSubmitSuccess();
            onClose();
        }
        console.log(result);
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

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="aroma">Mùi hương</Label>
                        <Popover id="aroma" open={aromaOpen} onOpenChange={setAromaOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={aromaOpen}
                                    className="w-[200px] justify-between"
                                >
                                {selectedAroma ? selectedAroma.label : "Chọn mùi hương..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Tìm kiếm..." />
                                <CommandList>
                                    <CommandEmpty>No aroma found.</CommandEmpty>
                                    <CommandGroup>
                                    {aromas.map((aroma) => (
                                        <CommandItem
                                        key={aroma.value}
                                        value={aroma.value}
                                        onSelect={(currentValue) => {
                                            setAromaValue(currentValue === aromaValue ? "" : currentValue);
                                            setAromaOpen(false);
                                        }}
                                        >
                                        {aroma.label}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="type">Loại cà phê</Label>
                        <Popover id="type" open={typeOpen} onOpenChange={setTypeOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={typeOpen}
                                    className="w-[200px] justify-between"
                                >
                                {selectedType ? selectedType.label : "Chọn loại..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Tìm kiếm..." />
                                <CommandList>
                                    <CommandEmpty>No type found.</CommandEmpty>
                                    <CommandGroup>
                                    {types.map((type) => (
                                        <CommandItem
                                        key={type.value}
                                        value={type.value}
                                        onSelect={(currentValue) => {
                                            setTypeValue(currentValue === typeValue ? "" : currentValue);
                                            setTypeOpen(false);
                                        }}
                                        >
                                        {type.label}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="roast">Độ rang</Label>
                        <Popover id="roast" open={roastOpen} onOpenChange={setRoastOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={roastOpen}
                                    className="w-[200px] justify-between"
                                >
                                {selectedRoast ? selectedRoast.label : "Chọn độ rang..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Tìm kiếm..." />
                                <CommandList>
                                    <CommandEmpty>No level found.</CommandEmpty>
                                    <CommandGroup>
                                    {roast_lvls.map((roast) => (
                                        <CommandItem
                                        key={roast.value}
                                        value={roast.value}
                                        onSelect={(currentValue) => {
                                            setRoastValue(currentValue === roastValue ? "" : currentValue);
                                            setRoastOpen(false);
                                        }}
                                        >
                                        {roast.label}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
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

            <Button type="submit" disabled={loading}>
                {loading ? "Đang cập nhật..." : "Cập nhật"}
                {/* Lưu thay đổi */}
            </Button>

        </form>
    )
}
