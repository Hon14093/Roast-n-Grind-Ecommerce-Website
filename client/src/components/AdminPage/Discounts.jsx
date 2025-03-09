import React, { useEffect } from 'react';
import { updateDiscount } from '@/hooks/productAPI'; // Adjust the import path as necessary
import { useDiscountActions } from '@/hooks/table-actions/useDiscountsActions';
import { AddForm } from '@/components/modals/discount/AddForm';
import { EditForm } from '@/components/modals/discount/EditForm';
import { DiscountModals } from '@/components/modals/discount/DiscountsModals';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx";
import { Separator } from "../ui/separator.jsx";
import {
    SidebarInset,
    SidebarTrigger,
} from "../ui/sidebar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table.jsx";
import { Button } from "../ui/button.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog.jsx";

function Discounts() {
    const {
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
    } = useDiscountActions();

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateSubmit = async (updatedDiscount) => {
        try {
            await updateDiscount(updatedDiscount.discount_id, updatedDiscount);
            fetchData();
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Quản lý</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Khuyến mãi</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Tạo mã giảm giá mới</h2>
                    <AddForm onSubmit={handleCreate} isLoading={isLoading} />
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã</TableHead>
                                <TableHead>Giá trị</TableHead>
                                <TableHead>Số tiền giảm tối đa</TableHead>
                                <TableHead>Số tiền đơn tối thiểu</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6}>Đang tải...</TableCell>
                                </TableRow>
                            ) : discounts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>Không có dữ liệu</TableCell>
                                </TableRow>
                            ) : (
                                discounts.map((discount) => (
                                    <TableRow key={discount.discount_id}>
                                        <TableCell>{discount.discount_code}</TableCell>
                                        <TableCell>{discount.discount_value}</TableCell>
                                        <TableCell>{discount.max_discount_amount}</TableCell>
                                        <TableCell>{discount.min_order_amount}</TableCell>
                                        <TableCell>{discount.is_active ? "Kích hoạt" : "Không kích hoạt"}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetails(discount.discount_id)}
                                                className="mr-2"
                                            >
                                                Xem
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(discount.discount_id)}
                                                className="mr-2"
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(discount.discount_id)}
                                            >
                                                Xóa
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <DiscountModals
                open={isDetailsModalOpen}
                onOpenChange={setIsDetailsModalOpen}
                selectedDiscount={selectedDiscount}
            />

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
                    </DialogHeader>
                    {selectedDiscount && (
                        <EditForm
                            discount={selectedDiscount}
                            onSubmit={handleUpdateSubmit}
                            isLoading={isLoading}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </SidebarInset>
    );
}

export default Discounts;