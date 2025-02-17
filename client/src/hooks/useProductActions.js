import { useState } from "react";

export function useProductActions(products) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleViewDetails = (productId) => {
        // code has not been reviewed, the function of such codes is unknown :)
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(product);
        
        // setSelectedProduct('001');
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (productId) => {
        // code has not been reviewed, the function of such codes is unknown :)
        const product = products.find((p) => p.id === productId);
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (productId) => {
        // 
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
