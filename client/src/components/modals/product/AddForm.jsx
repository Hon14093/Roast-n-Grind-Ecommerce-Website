import { useState } from 'react'

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

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadImage } from '@/hooks/Cloudinary/cloudinary'

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


export function AddForm() {
    const placeholderImage = "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg";
    const [preview, setPreview] = useState(placeholderImage);
    const [imageFile, setImageFile] = useState(null);

    const [aromaOpen, setAromaOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);
    const [roastOpen, setRoastOpen] = useState(false);

    const [aromaValue, setAromaValue] = useState('');
    const [typeValue, setTypeValue] = useState('');
    const [roastValue, setRoastValue] = useState('');

    const selectedAroma = aromas.find((aroma) => aroma.value === aromaValue);
    const selectedType = types.find((type) => type.value === typeValue);
    const selectedRoast = roast_lvls.find((roast) => roast.value === roastValue);

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
    
        const imageUrl = await uploadImage(imageFile); // Lấy URL ảnh
        console.log("Ảnh đã upload:", imageUrl);
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
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="product_des">Miêu tả</Label>
                        <Textarea 
                            id="product_des" 
                            placeholder="Miêu tả" 
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
                                {selectedAroma ? selectedAroma.label : "Select aroma..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search framework..." />
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
                                {selectedType ? selectedType.label : "Select type..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search framework..." />
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
                                {selectedRoast ? selectedRoast.label : "Select type..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search framework..." />
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