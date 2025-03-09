import React, { useEffect } from 'react';
import { useOrderActions } from '@/hooks/table-actions/useOrderActions';
import { AddForm } from '@/components/modals/orders/AddForm';
import { EditForm } from '@/components/modals/orders/EditForm';
import { ViewDetails } from '@/components/modals/orders/ViewDetails';

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
import { createOrder } from '@/hooks/productAPI.jsx';

function Orders() {
    const {
        orders,
        selectedOrder,
        isDetailsModalOpen,
        isEditModalOpen,
        isAddModalOpen,
        isLoading,
        fetchData,
        handleViewDetails,
        handleEdit,
        handleDelete,
        handleUpdateStatus,
        handleCreate,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsAddModalOpen,
    } = useOrderActions();

    useEffect(() => {
        fetchData();
    }, []);

    const onCreateOrder = async (order) => {
        const createdOrder = await createOrder(order);
        handleCreate(createdOrder);
        return createdOrder;
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
                                <BreadcrumbPage>Đơn hàng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-2">Tạo đơn hàng mới</h2>
                    <Button onClick={() => setIsAddModalOpen(true)}>Thêm đơn hàng</Button>
                </div>

                <div className="rounded-xl bg-muted/50 p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID đơn hàng</TableHead>
                                <TableHead>Tổng tiền</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Ngày đặt</TableHead>
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>Đang tải...</TableCell>
                                </TableRow>
                            ) : orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>Không có dữ liệu</TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order.order_id}>
                                        <TableCell>{order.order_id}</TableCell>
                                        <TableCell>{order.order_total.toLocaleString()} VNĐ</TableCell>
                                        <TableCell>{order.status_id}</TableCell>
                                        <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewDetails(order.order_id)}
                                                className="mr-2"
                                            >
                                                Xem
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(order.order_id)}
                                                className="mr-2"
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(order.order_id)}
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

            <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && <ViewDetails order={selectedOrder} />}
                </DialogContent>
            </Dialog>

            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <EditForm
                            order={selectedOrder}
                            onSubmit={handleUpdateStatus}
                            isLoading={isLoading}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm đơn hàng mới</DialogTitle>
                    </DialogHeader>
                    <AddForm onSubmit={onCreateOrder} isLoading={isLoading} />
                </DialogContent>
            </Dialog>
        </SidebarInset>
    );
}

export default Orders;