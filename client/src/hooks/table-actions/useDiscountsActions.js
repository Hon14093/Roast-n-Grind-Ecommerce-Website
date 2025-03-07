import { useState } from "react";
import { fetchDiscounts, createDiscount, updateDiscount, deleteDiscount } from "@/hooks/discountAPI"; // API cho discount

export function useDiscountActions() {
    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Lấy danh sách giảm giá
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchDiscounts();
            setDiscounts(data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách giảm giá:", error);
        }
        setIsLoading(false);
    };

    // Xem chi tiết mã giảm giá
    const handleViewDetails = (discountId) => {
        const discount = discounts.find((d) => d.discount_id === discountId);
        setSelectedDiscount(discount);
        setIsDetailsModalOpen(true);
    };

    // Chỉnh sửa giảm giá
    const handleEdit = (discountId) => {
        const discount = discounts.find((d) => d.discount_id === discountId);
        setSelectedDiscount(discount);
        setIsEditModalOpen(true);
    };

    // Xóa giảm giá
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

    // Tạo giảm giá mới
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
        isDeleteModalOpen,
        isLoading,
        fetchData,
        handleViewDetails,
        handleEdit,
        handleDelete,
        handleCreate,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen,
    };
}
