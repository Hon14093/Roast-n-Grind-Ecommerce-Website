import React from 'react'
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
import { EditForm } from './EditForm';
import { ViewDetails } from './ViewDetails';
import { Confirmation } from './Confirmation';
import { AddForm } from './AddForm';

export function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin sản phẩm</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                    </DialogDescription> */}
                </DialogHeader>
                <ScrollArea className='text-base text-black'>
                    <ViewDetails product={product} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export function EditModal({ product, open, onClose, onSubmitSuccess }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin sản phẩm</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                        <EditForm product={product} />
                    </DialogDescription> */}
                </DialogHeader>

                <div className='text-base text-darkOlive'>
                    <EditForm product={product} onClose={onClose} onSubmitSuccess={onSubmitSuccess} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function AddModal() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='outline'>
                    <Plus />
                    Thêm sản phẩm
                </Button>
            </DialogTrigger>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thêm sản phẩm</DialogTitle>
                    <DialogDescription className='text-base text-black'>

                    </DialogDescription>
                </DialogHeader>
                <div className='text-base text-darkOlive'>
                    <AddForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function DeleteModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mx-auto text-lg'>
                        <CircleX color='red' size={120} className='mx-auto pb-4'/>
                        Bạn có chắc chắn muốn xóa sản phẩm này?
                    </DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        
                    </DialogDescription>
                    <Confirmation product={product} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}