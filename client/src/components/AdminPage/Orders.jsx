import React, { useState, useEffect } from 'react';

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
import { DetailsModal, EditModal, DeleteModal, AddModal } from '../modals/orders/OrdersModals.jsx';
import { getOrders } from '@/hooks/productAPI.jsx';
import { useOrderActions } from '@/hooks/orderActions.jsx';


export default function Orders() {
const [data, setData] = useState([]);

useEffect(() => {
    getOrders(setData);
}, []);

const {
    selectedOrder,
    isDetailsModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    handleViewDetails,
    handleEdit,
    handleDelete,
    setIsDetailsModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen
} = useOrderActions(data);

const handleSubmitSuccess = () => {
    getOrders(setData);
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
        </header> {/* Moved closing tag here */}

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

        <DetailsModal 
            order={selectedOrder}
            open={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
        />

        <EditModal 
            order={selectedOrder}
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSubmitSuccess={handleSubmitSuccess}
        />

        <DeleteModal
            order={selectedOrder}
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
        />

        <AddModal onSubmitSuccess={handleSubmitSuccess} />
    </SidebarInset>
)
}