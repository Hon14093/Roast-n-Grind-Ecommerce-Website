import React from "react";
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Plus, CircleX } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {ViewDetetails} from './ViewDetails';
import { EditForm}  from './EditForm';";

export function OrdersModals({ orders }) {
    return (
        <>
            {orders.map((order) => (
                <Dialog key={order.order_id}>
                    <DialogTrigger>
                        <Button variant="ghost">
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                            <DialogDescription>
                                <Button variant="ghost">
                                    <CircleX />
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea>
                            <ViewDetails order={order} />
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
}

