import { useState } from "react";
// import { deleteProduct } from "../productAPI";

export function useOrderActions(orders) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleViewDetails = (orderId) => {
        const order = orders.find((o) => o.order_id === orderId)
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (orderId) => {
        const order = orders.find((o) => o.order_id === orderId)
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    return {
        selectedOrder,
        isDetailsModalOpen,
        isEditModalOpen,
        handleViewDetails,
        handleEdit,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
    };
}