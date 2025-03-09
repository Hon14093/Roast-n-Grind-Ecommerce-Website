import React from "react";
import PropTypes from 'prop-types';
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { CircleX } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ViewDetails } from './ViewDetails';

export function DiscountModals({ open, onOpenChange, selectedDiscount }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chi tiết khuyến mãi</DialogTitle>
                    <div className="flex justify-end">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            <CircleX />
                        </Button>
                    </div>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                    {selectedDiscount && <ViewDetails discount={selectedDiscount} />}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

DiscountModals.propTypes = {
    open: PropTypes.bool.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    selectedDiscount: PropTypes.shape({
        discount_id: PropTypes.string.isRequired,
        discount_code: PropTypes.string,
        discount_value: PropTypes.number,
        max_discount_amount: PropTypes.number,
        min_order_amount: PropTypes.number,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
        is_active: PropTypes.bool,
    }),
};