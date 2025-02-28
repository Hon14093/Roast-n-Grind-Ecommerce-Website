import { useState } from "react";
import { deleteProduct } from "../productAPI";

export function useProductActions(products) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 

    const handleViewDetails = (productId) => {
        const product = products.find((p) => p.product_id === productId);
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (productId) => {
        const product = products.find((p) => p.product_id === productId);
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (productId) => {
        deleteProduct(productId);
        console.log('Delete')
    };

    return {
        selectedProduct,
        isDetailsModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen
    };
}
