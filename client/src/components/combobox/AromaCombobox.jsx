import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getAromas } from "@/hooks/productAPI";

// const aromas = [
//     { aroma_id: 1, aroma_name: "Fruity" },
//     { aroma_id: 2, aroma_name: "Chocolate" },
//     { aroma_id: 3, aroma_name: "Herb" },
//     { aroma_id: 4, aroma_name: "Sour" },
// ];

export default function AromaComboBox({ value, onChange }) {
    useEffect(() => {
        getAromas(setAromas);
    },[])

    const [open, setOpen] = useState(false);
    const [aromas, setAromas] = useState([]);

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="type">Loại cà phê</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                    {value ? aromas.find((aroma) => aroma.aroma_id === value)?.aroma_name : "Select an aroma"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                    <CommandInput placeholder="Search aroma..." />
                    <CommandList>
                        {aromas.map((aroma) => (
                        <CommandItem
                            key={aroma.aroma_id}
                            onSelect={() => {
                            onChange(aroma.aroma_id);
                            setOpen(false);
                            }}
                        >
                            <Check
                            className={`mr-2 h-4 w-4 ${value === aroma.aroma_id ? "opacity-100" : "opacity-0"}`}
                            />
                            {aroma.aroma_name}
                        </CommandItem>
                        ))}
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}
