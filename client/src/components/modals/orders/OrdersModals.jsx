import React, { useState } from "react";
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
import { EditForm } from './EditForm';
import { Confirmation } from './Confirmation';
import { AddForm } from './AddForm';

export function OrdersModals({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleOpenDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsOpen(true);
    };

    const handleOpenEdit = (order) => {
        setSelectedOrder(order);
        setIsEditOpen(true);
    };

    const handleOpenDelete = (order) => {
        setSelectedOrder(order);
        setIsDeleteOpen(true);
    };

    const handleClose = () => {
        setSelectedOrder(null);
        setIsDetailsOpen(false);
        setIsEditOpen(false);
        setIsAddOpen(false);
        setIsDeleteOpen(false);
    };

    const handleAddSuccess = () => {
        handleClose();
        // Add any additional logic after adding a product
    };

    const handleEditSuccess = () => {
        handleClose();
        // Add any additional logic after editing a product
    };

    return (
        <>
            <Button variant='outline' onClick={() => setIsAddOpen(true)}>
                <Plus />
                Thêm sản phẩm
            </Button>

            {orders.map((order) => (
                <div key={order.order_id}>
                    <Button variant="ghost" onClick={() => handleOpenDetails(order)}>
                        Chi tiết đơn hàng
                    </Button>
                    <Button variant="ghost" onClick={() => handleOpenEdit(order)}>
                        Cập nhật đơn hàng
                    </Button>
                    <Button variant="ghost" onClick={() => handleOpenDelete(order)}>
                        Xóa đơn hàng
                    </Button>
                </div>
            ))}

            <DetailsModal product={selectedOrder} open={isDetailsOpen} onClose={handleClose} />
            <EditModal product={selectedOrder} open={isEditOpen} onClose={handleClose} onSubmitSuccess={handleEditSuccess} />
            <AddModal onSubmitSuccess={handleAddSuccess} />
            <DeleteModal product={selectedOrder} open={isDeleteOpen} onClose={handleClose} />
        </>
    );
}

export function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='w-[1000px] max-w-none'>
                <DialogHeader>
                    <DialogTitle>Thông tin sản phẩm</DialogTitle>
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
                </DialogHeader>
                <div className='text-base text-darkOlive'>
                    <EditForm product={product} onClose={onClose} onSubmitSuccess={onSubmitSuccess} />
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
                    <AddForm onSubmitSuccess={handleSubmitSucess} />
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


export function OrderDetailsForm({ productWeights, onSubmit, onClose }) {
    const [detail, setDetail] = useState({
        pw_id: '',
        quantity: 1,
        subtotal: 0,
        is_ground: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedProduct = productWeights.find((pw) => pw.pw_id === detail.pw_id);
        const subtotal = selectedProduct ? selectedProduct.product_price * detail.quantity : 0;
        onSubmit({ ...detail, subtotal });
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm chi tiết đơn hàng</DialogTitle>
                </DialogHeader>
                <form className="grid gap-5" onSubmit={handleSubmit}>
                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="pw_id">Sản phẩm</Label>
                        <select
                            id="pw_id"
                            value={detail.pw_id}
                            onChange={(e) => setDetail({ ...detail, pw_id: e.target.value })}
                        >
                            <option value="">Chọn sản phẩm</option>
                            {productWeights.map((pw) => (
                                <option key={pw.pw_id} value={pw.pw_id}>
                                    {pw.Product.product_name} - {pw.product_price} VNĐ
                                </option>
                            ))}
                        </select>
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="quantity">Số lượng</Label>
                        <Input
                            id="quantity"
                            type="number"
                            value={detail.quantity}
                            onChange={(e) => setDetail({ ...detail, quantity: parseInt(e.target.value) || 1 })}
                        />
                    </article>

                    <article className="grid w-full items-center gap-1.5">
                        <Label htmlFor="is_ground">Xay sẵn</Label>
                        <Input
                            id="is_ground"
                            type="checkbox"
                            checked={detail.is_ground}
                            onChange={(e) => setDetail({ ...detail, is_ground: e.target.checked })}
                        />
                    </article>

                    <Button type="submit">Thêm</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}