import {useState} from "react";

export function useOrderActions(orders) {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handleViewDetails = (orderId) => {
        const order = orders.find((o) => o.order_id === orderId);
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };
    const handleEdit = (orderId) => {
        const order = orders.find((o) => o.order_id === orderId);
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };
    const handleDelete = async (orderId) => {
        console.log("Delete");
    };
    return {
        selectedOrder,
        isDetailsModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen,
    };
}