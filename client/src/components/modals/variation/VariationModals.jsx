import React from 'react'
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { CircleX, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { EditForm } from './EditForm';
import { AddForm } from './AddForm';
import { ViewDetails } from './ViewDetails';
import { Confirmation } from './Confirmation';
import { useState } from "react";

export function DetailsModal({ variation, open, onClose }) {
    if (!variation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thông tin biến thể</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                    </DialogDescription> */}
                </DialogHeader>
                <ScrollArea className='text-base text-black'>
                    <ViewDetails variation={variation} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export function EditModal({ variation, open, onClose, onSubmitSuccess }) {
    if (!variation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                        <EditForm product={product} />
                    </DialogDescription> */}
                    
                </DialogHeader>

                <div className='text-base text-darkOlive'>
                    <EditForm variation={variation} onClose={onClose} onSubmitSuccess={onSubmitSuccess} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function AddModal({ onSubmitSuccess }) {
    const [open, setOpen] = useState(false);
        
    const handleSubmitSucess = () => {
        onSubmitSuccess();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpen(true)}>
                    <Plus />
                    Thêm biến thể
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm biến thể</DialogTitle>
                    <DialogDescription className='text-base text-black'>

                    </DialogDescription>
                </DialogHeader>

                <div className='text-base text-darkOlive'>
                    <AddForm onSubmitSuccess={handleSubmitSucess} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export function DeleteModal({ variation, open, onClose }) {
    if (!variation) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mx-auto text-lg'>
                        <CircleX color='red' size={120} className='mx-auto pb-4'/>
                        Bạn có chắc chắn muốn xóa biến thể này?
                    </DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        
                    </DialogDescription>
                    <Confirmation variation={variation} />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}