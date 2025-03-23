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
import { ViewDetails } from './ViewDetails';

import AddForm from './AddForm';
import EditForm from './EditForm';

export function DetailsModal({ discount, open, onClose }) {
    if (!discount) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Thông tin khuyến mãi</DialogTitle>
                </DialogHeader>
                <ScrollArea className='text-base text-darkOlive'>
                    <ViewDetails discount={discount} />
                </ScrollArea>
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
                    Thêm khuyến mãi
                </Button>
            </DialogTrigger>

            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle>Thêm khuyến mãi</DialogTitle>
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

export function EditModal({ discount, open, onClose, onSubmitSuccess }) {
    if (!discount) return null;

    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent className=''>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin khuyến mãi</DialogTitle>
                    {/* <DialogDescription className='text-base text-black'>
                        <EditForm product={product} />
                    </DialogDescription> */}
                </DialogHeader>

                <div className='text-base text-darkOlive'>
                    <EditForm discount={discount} onClose={onClose} onSubmitSuccess={onSubmitSuccess} />

                </div>
            </DialogContent>
        </Dialog>
    )
}
