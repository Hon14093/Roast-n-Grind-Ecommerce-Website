import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Label } from "../ui/label";
import { Check } from "lucide-react";
import { getTypes } from "@/hooks/productAPI";

export default function ProductTypeComboBox({ value, onChange }) {
    useEffect(() => {
        getTypes(setProductTypes);
    })

    const [open, setOpen] = useState(false);
    const [productTypes, setProductTypes] = useState([]);

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="roast">Loại sản phẩm</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                    {productTypes.find((type) => type.type_id === value)?.type_name || "Select a type"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                    <CommandInput placeholder="Search product type..." />
                    <CommandList>
                        {productTypes.map((type) => (
                        <CommandItem
                            key={type.type_id}
                            onSelect={() => {
                            onChange(type.type_id);
                            setOpen(false);
                            }}
                        >
                            <Check className={`mr-2 h-4 w-4 ${value === type.type_id ? "opacity-100" : "opacity-0"}`} />
                            {type.type_name}
                        </CommandItem>
                        ))}
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}
