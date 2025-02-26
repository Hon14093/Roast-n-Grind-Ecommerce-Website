import { useState } from "react";

export function useProductActions(products) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        console.log('Delete')
    };

    return {
        selectedProduct,
        isDetailsModalOpen,
        isEditModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
    };
}
