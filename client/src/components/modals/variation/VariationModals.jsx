import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

export function DetailsModal({ variation, open, onClose }) {
    if (!variation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin biến thể</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                    </DialogDescription> */}
                </DialogHeader>
                <ScrollArea className='text-base text-black'>
                    {/* <ViewDetails product={product} /> */}
                    lksjdlfkjsldkjflkj
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export function EditModal({ variation, open, onClose }) {
    if (!variation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                        <EditForm product={product} />
                    </DialogDescription> */}
                    
                </DialogHeader>

                <div className='text-base text-darkOlive'>
                    {/* <EditForm product={product} /> */}
                    jljljsljljklsdf
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function AddModal({ open, onClose }) {
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm sản phẩm</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}