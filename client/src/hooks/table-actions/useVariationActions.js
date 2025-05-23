import { useState } from "react";

export function useVariationActions(variations) {
    const [selectedVariation, setSelectedVariation] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleViewDetails = (Id) => {
        const variation = variations.find((w) => w.pw_id === Id);
        setSelectedVariation(variation);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (Id) => {
        const variation = variations.find((w) => w.pw_id === Id);
        setSelectedVariation(variation);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (Id) => {
        const variation = variations.find((w) => w.pw_id === Id);
        setSelectedVariation(variation);
        setIsDeleteModalOpen(true);
        console.log('Delete')
    };

    return {
        selectedVariation,
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
