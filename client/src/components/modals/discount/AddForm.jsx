import { useState } from 'react';

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

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const discountTypes = [
    { value: "percentage", label: "Percentage" },
    { value: "fixed_amount", label: "Fixed Amount" },
];

export function AddForm() {
    const [typeOpen, setTypeOpen] = useState(false);
    const [typeValue, setTypeValue] = useState('');

    const selectedType = discountTypes.find((type) => type.value === typeValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Discount submitted:", {
            type: selectedType,
        });
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="discount_name">Discount Name</Label>
                        <Input 
                            id="discount_name" 
                            placeholder="Discount Name" 
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="discount_des">Description</Label>
                        <Textarea 
                            id="discount_des" 
                            placeholder="Description" 
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="type">Discount Type</Label>
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
                                <CommandInput placeholder="Search type..." />
                                <CommandList>
                                    <CommandEmpty>No type found.</CommandEmpty>
                                    <CommandGroup>
                                    {discountTypes.map((type) => (
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
                        <Label htmlFor="discount_value">Discount Value</Label>
                        <Input 
                            id="discount_value" 
                            placeholder="Discount Value" 
                            type="number"
                        />
                    </article>

                </section>
            </div>

            <Button>Save Changes</Button>
        </form>
    );
}
