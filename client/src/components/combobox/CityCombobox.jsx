import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getAllCities } from "@/hooks/addressAPI";

export default function CityComboBox({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getAllCities(setCities);
    }, []);

    return (
        <article className="grid w-full items-center gap-2.5">
            <Label htmlFor="city">Thành phố</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-between border-darkOlive bg-ivory">
                        {value ? cities.find((city) => city.city_id === value)?.city_name : "Chọn thành phố"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-2">
                    <Command>
                        <CommandInput placeholder="Tìm kiếm thành phố..." />
                        <CommandList>
                            {cities.map((city) => (
                                <CommandItem
                                    key={city.city_id}
                                    onSelect={() => {
                                        onChange(city.city_id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === city.city_id ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {city.city_name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </article>
    );
}