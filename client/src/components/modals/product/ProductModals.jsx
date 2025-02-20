import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { EditForm } from './EditForm';

export function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thông tin sản phẩm</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        <span>ID sản phẩm: {product.product_id}</span> <br />
                        <span>Tên sản phẩm: {product.product_name}</span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export function EditModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='pb-5'>Cập nhật thông tin sản phẩm</DialogTitle>
                    <DialogDescription className='text-base text-black'>
                        <EditForm product={product} />
                    </DialogDescription>
                </DialogHeader>
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
                        Add
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
