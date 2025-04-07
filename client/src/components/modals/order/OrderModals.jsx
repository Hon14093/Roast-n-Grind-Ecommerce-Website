import React, { useState } from 'react'
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
import ViewDetails from './ViewDetails';
import ViewDetailsReview from './ViewDetailsReview';
import { EditForm } from './EditForm';

export function DetailsModal({ order, open, onClose }) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin đơn hàng</DialogTitle>
                </DialogHeader>
                <ScrollArea className='text-base text-darkOlive'>
                    <ViewDetails order={order} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export function DetailsModalWithReview({ order, open, onClose }) {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin đơn hàng</DialogTitle>
                </DialogHeader>
                <ScrollArea className='text-base text-darkOlive'>
                    <ViewDetailsReview order={order} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

// export function EditModal({ product, open, onClose, onSubmitSuccess }) {
//     if (!product) return null;

//     return (
//         <Dialog open={open} onOpenChange={onClose} >
//             <DialogContent className='w-[1000px] max-w-none'>
//                 <DialogHeader>
//                     <DialogTitle className='pb-5'>Cập nhật thông tin sản phẩm</DialogTitle>
//                     {/* <DialogDescription className='text-base text-black'>
//                         <EditForm product={product} />
//                     </DialogDescription> */}
//                 </DialogHeader>

//                 <div className='text-base text-darkOlive'>
//                     <EditForm  />
//                 </div>
//             </DialogContent>
//         </Dialog>
//     )
// }
