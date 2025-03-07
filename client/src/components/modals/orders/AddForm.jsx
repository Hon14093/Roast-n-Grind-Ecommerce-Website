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

const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
];
const paymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
];

export function AddForm() {
    const [statusOpen, setStatusOpen] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false);

    const [statusValue, setStatusValue] = useState('');
    const [paymentValue, setPaymentValue] = useState('');

    const selectedStatus = orderStatuses.find((status) => status.value === statusValue);
    const selectedPayment = paymentMethods.find((payment) => payment.value === paymentValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Order submitted:", {
            status: selectedStatus,
            payment: selectedPayment,
        });
    };

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-6 items-start'>
                <section className='grid gap-5'>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="order_name">Order Name</Label>
                        <Input 
                            id="order_name" 
                            placeholder="Order Name" 
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="order_des">Description</Label>
                        <Textarea 
                            id="order_des" 
                            placeholder="Description" 
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="status">Order Status</Label>
                        <Popover id="status" open={statusOpen} onOpenChange={setStatusOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={statusOpen}
                                    className="w-[200px] justify-between"
                                >
                                {selectedStatus ? selectedStatus.label : "Select status..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search status..." />
                                <CommandList>
                                    <CommandEmpty>No status found.</CommandEmpty>
                                    <CommandGroup>
                                    {orderStatuses.map((status) => (
                                        <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(currentValue) => {
                                            setStatusValue(currentValue === statusValue ? "" : currentValue);
                                            setStatusOpen(false);
                                        }}
                                        >
                                        {status.label}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="payment">Payment Method</Label>
                        <Popover id="payment" open={paymentOpen} onOpenChange={setPaymentOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={paymentOpen}
                                    className="w-[200px] justify-between"
                                >
                                {selectedPayment ? selectedPayment.label : "Select payment method..."}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                <CommandInput placeholder="Search payment method..." />
                                <CommandList>
                                    <CommandEmpty>No payment method found.</CommandEmpty>
                                    <CommandGroup>
                                    {paymentMethods.map((payment) => (
                                        <CommandItem
                                        key={payment.value}
                                        value={payment.value}
                                        onSelect={(currentValue) => {
                                            setPaymentValue(currentValue === paymentValue ? "" : currentValue);
                                            setPaymentOpen(false);
                                        }}
                                        >
                                        {payment.label}
                                        </CommandItem>
                                    ))}
                                    </CommandGroup>
                                </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </article>

                </section>
            </div>

            <Button>Save Changes</Button>
        </form>
    );
}
