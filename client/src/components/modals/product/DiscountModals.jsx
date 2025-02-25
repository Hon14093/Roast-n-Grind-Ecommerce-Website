// import React from 'react'
// import { 
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle
// } from "@/components/ui/dialog";
// import { EditDiscount } from './EditDiscount';
// import { AddDiscount } from './AddDiscount';
// export function DetailsModal({ product, open, onClose }) {
//     if (!product) return null;

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Thông tin sản phẩm</DialogTitle>
//                     <DialogDescription className='text-base text-black'>
//                         <span>ID sản phẩm: {product.product_id}</span> <br />
//                         <span>Tên sản phẩm: {product.product_name}</span>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export function EditModal({ product, open, onClose }) {
//     if (!product) return null;

//     return (
//         <Dialog open={open} onOpenChange={onClose} >
//             <DialogContent className='w-[1000px] max-w-none'>
//                 <DialogHeader>
//                     <DialogTitle className='pb-5'>Cập nhật thông tin sản phẩm</DialogTitle>
//                     <DialogDescription className='text-base text-black'>
//                         <EditForm product={product} />
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export function AddModal({ open, onClose }) {
//     return (
//         <Dialog open={open} onOpenChange={onClose}> 
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Thêm sản phẩm</DialogTitle>
//                     <DialogDescription className='text-base text-black'>
//                         <AddForm></AddForm>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }
