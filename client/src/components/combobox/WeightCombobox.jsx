import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Label } from "../ui/label";
import { Check } from "lucide-react";
import { getWeights } from "@/hooks/productAPI";

export default function WeightComboBox({ value, onChange }) {
    useEffect(() => {
        getWeights(setWeights);
    })

    const [open, setOpen] = useState(false);
    const [weightOptions, setWeights] = useState([]);

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="roast">Cân nặng</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                    {weightOptions.find((weight) => weight.weight_id === value)?.weight_name || "Select weight"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                    <CommandInput placeholder="Search weight..." />
                    <CommandList>
                        {weightOptions.map((weight) => (
                        <CommandItem
                            key={weight.weight_id}
                            onSelect={() => {
                            onChange(weight.weight_id);
                            setOpen(false);
                            }}
                        >
                            <Check className={`mr-2 h-4 w-4 ${value === weight.weight_id ? "opacity-100" : "opacity-0"}`} />
                            {weight.weight_name}
                        </CommandItem>
                        ))}
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}
