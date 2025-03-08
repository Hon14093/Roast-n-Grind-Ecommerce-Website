import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx"
import { Separator } from "../ui/separator.jsx"
import {
    SidebarInset,
    SidebarTrigger,
} from "../ui/sidebar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PackagePlus } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { getAllOrders } from '../../hooks/productAPI.jsx'; 
import { useOrderActions } from '@/hooks/table-actions/useOrdersActions.js'
import { orderColumns } from '../columns.jsx'
import { DetailsModal, EditModal, DeleteModal, AddModal } from '../modals/orders/OrdersModals.jsx'
function Orders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Fetching orders...");
        getAllOrders(setData)
            .then(() => console.log("Orders fetched:", data))
            .catch((error) => console.error("Fetch error:", error));
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
        setIsDeleteModalOpen,
    } = useOrderActions(data);

    const handleSubmitSuccess = () => {
        getAllOrders(setData);
    };

    console.log("Rendering Orders - Data:", data);
    console.log("Selected Order:", selectedOrder);

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng
                        </div>
                        <div className='ml-auto'>
                            <Link to='/admin/orders/variations'>
                                <Button variant='outline' className='mr-3'>
                                    <PackagePlus />
                                    Biến thể
                                </Button>
                            </Link>
                            <AddModal onSubmitSuccess={handleSubmitSuccess} />
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {data.length === 0 ? (
                        <p>Đang tải dữ liệu hoặc không có đơn hàng...</p>
                    ) : (
                        <DataTable
                            columns={orderColumns({
                                onViewDetails: handleViewDetails,
                                onEdit: handleEdit,
                                onDelete: handleDelete
                            })}
                            data={data}
                        />
                    )}
                    <DetailsModal 
                        product={selectedOrder || {}}
                        open={!!isDetailsModalOpen}
                        onClose={() => {
                            console.log("Closing DetailsModal");
                            setIsDetailsModalOpen(false);
                        }}
                    />
                    <EditModal 
                        product={selectedOrder || {}}
                        open={!!isEditModalOpen}
                        onClose={() => {
                            console.log("Closing EditModal");
                            setIsEditModalOpen(false);
                        }}
                        onSubmitSuccess={handleSubmitSuccess}
                    />
                    <DeleteModal
                        product={selectedOrder || {}}
                        open={!!isDeleteModalOpen}
                        onClose={() => {
                            console.log("Closing DeleteModal");
                            setIsDeleteModalOpen(false);
                        }}
                    />
                </CardContent>
            </Card>
        </SidebarInset>
    );
}

export default Orders;