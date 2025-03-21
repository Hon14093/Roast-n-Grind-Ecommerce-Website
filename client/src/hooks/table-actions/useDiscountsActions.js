import { useState } from "react";
import { createDiscount, deleteDiscount, fetchDiscounts } from "../productAPI";

export function useDiscountActions() {
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchDiscounts();
            setDiscounts(data || []);
        } catch (error) {
            console.error("Lỗi khi tải danh sách giảm giá:", error);
        }
        setIsLoading(false);
    };

    const handleViewDetails = (discountId) => {
        const discount = discounts.find((d) => d.discount_id === discountId);
        setSelectedDiscount(discount);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (discountId) => {
        const discount = discounts.find((d) => d.discount_id === discountId);
        setSelectedDiscount(discount);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (discountId) => {
        setIsLoading(true);
        try {
            await deleteDiscount(discountId);
            setDiscounts(discounts.filter((d) => d.discount_id !== discountId));
        } catch (error) {
            console.error("Lỗi khi xóa giảm giá:", error);
        }
        setIsLoading(false);
    };

    const handleCreate = async (newDiscount) => {
        setIsLoading(true);
        try {
            const createdDiscount = await createDiscount(newDiscount);
            setDiscounts([...discounts, createdDiscount]);
        } catch (error) {
            console.error("Lỗi khi tạo mã giảm giá:", error);
        }
        setIsLoading(false);
    };

    return {
        discounts,
        selectedDiscount,
        isDetailsModalOpen,
        isEditModalOpen,
        isLoading,
        fetchData,
        handleViewDetails,
        handleEdit,
        handleDelete,
        handleCreate,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
    };
}