import React from "react";
import PropTypes from 'prop-types';
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
import { ViewDetails } from './ViewDetails';

export function DiscountModals({ discounts }) {
    return (
        <>
            {discounts.map((discount) => (
                <Dialog key={discount.discount_id}>
                    <DialogTrigger>
                        <Button variant="ghost">
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Chi tiết khuyến mãi</DialogTitle>
                            <DialogDescription>
                                <Button variant="ghost">
                                    <CircleX />
                                </Button>
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea>
                            <ViewDetails discount={discount} />
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            ))}
        </>
    );
}

DiscountModals.propTypes = {
    discounts: PropTypes.arrayOf(
        PropTypes.shape({
            discount_id: PropTypes.number.isRequired,
            // Add other properties of discount object if needed
        })
    ).isRequired,
};

