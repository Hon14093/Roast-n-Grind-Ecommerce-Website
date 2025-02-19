import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
// import { DialogTitle } from "@radix-ui/react-dialog";

import React from 'react'

export function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thông tin sản phẩm</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        <span>ID sản phẩm: {product.id}</span> <br />
                        <span>Tên sản phẩm: {product.name}</span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
