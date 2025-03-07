import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getProductData } from "@/hooks/productAPI";

export default function ProductCombobox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductData(setProducts);
    }, []); // Add empty dependency array to avoid infinite calls

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="product">Chọn sản phẩm</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                        {value ? products.find((product) => product.product_id === value)?.product_name : "Select a product"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Search product..." />
                        <CommandList>
                            {products.map((product) => (
                                <CommandItem
                                    key={product.product_id}
                                    onSelect={() => {
                                        onChange(product.product_id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === product.product_id ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {product.product_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}