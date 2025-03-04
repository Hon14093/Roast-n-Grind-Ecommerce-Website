import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { getRoastLevels } from "@/hooks/productAPI";
import { Check } from "lucide-react";
import { Label } from "../ui/label";

export default function RoastLevelComboBox({ value, onChange }) { 
    useEffect(() => {
        getRoastLevels(setRoastLevels);
    })

    const [open, setOpen] = useState(false);
    const [roastLevels, setRoastLevels] = useState([]);

    return (
        <article className="grid w-full items-center gap-1.5">
            <Label htmlFor="roast">Độ rang</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-between">
                    {roastLevels.find((roast) => roast.roast_id === value)?.roast_lvl || "Select roast level"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                    <CommandInput placeholder="Search roast level..." />
                    <CommandList>
                        {roastLevels.map((roast) => (
                        <CommandItem
                            key={roast.roast_id}
                            onSelect={() => {
                                onChange(roast.roast_id);
                                setOpen(false);
                            }}
                        >
                            <Check className={`mr-2 h-4 w-4 ${value === roast.roast_id ? "opacity-100" : "opacity-0"}`} />
                            {roast.roast_lvl}
                        </CommandItem>
                        ))}
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}
