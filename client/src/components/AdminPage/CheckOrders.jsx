import React, { useEffect, useState } from 'react'

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
import { PackagePlus, CircleX } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { checkOrdersColumns } from '../columns.jsx'

import { 
    getUnprocessedOrders, 
    getRejectedOrders,
    updateOrderStatus
} from '@/hooks/orderAPI.jsx'
import { DetailsModal } from '../modals/order/OrderModals.jsx'
import { Link } from 'react-router-dom'

export default function CheckOrders() {
    const [data, setData] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // function handleViewDetails() { console.log('details')}
    // function handleEdit() {}

    useEffect(() => {
        getUnprocessedOrders(setData);
        getRejectedOrders(setRejectedOrders);
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const handlePassOrder = async (order) => {
        const res = await updateOrderStatus(order.order_id, 2);
        if (res.success) {
            getUnprocessedOrders(setData);
            getRejectedOrders(setRejectedOrders);
        }
    }

    const handleRejectOrder = async (order) => {
        const res = await updateOrderStatus(order.order_id, 6);
        if (res.success) {
            getUnprocessedOrders(setData);
            getRejectedOrders(setRejectedOrders);
        }
    }

    const columnsWithActions = [
        ...checkOrdersColumns,
        {
            header: "Hành Động",
            id: "actions",
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500' 
                        onClick={() => handleViewDetails(row.original)}
                    >
                        Chi Tiết
                    </Button>
                    <Button size="sm" className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500" 
                        onClick={() => handlePassOrder(row.original)}
                    >
                        Duyệt
                    </Button>
                    <Button size="sm" className='bg-red-500 border border-red-500 hover:bg-white hover:text-red-500' 
                        onClick={() => handleRejectOrder(row.original)}
                    >
                        Hủy
                    </Button>
                </div>
            )
        }
    ];

    const columnsWithActions1 = [
        ...checkOrdersColumns,
        {
            header: "Hành Động",
            id: "actions",
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500' 
                        onClick={() => handleViewDetails(row.original)}
                    >
                        Chi Tiết
                    </Button>
                    <Button size="sm" className="bg-green-500 border border-green-500 hover:bg-white hover:text-green-500" 
                        onClick={() => handlePassOrder(row.original)}
                    >
                        Duyệt
                    </Button>
                </div>
            )
        }
    ];

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Quản lý
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator className="hidden md:block" />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Duyệt đơn hàng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            
            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng chưa duyệt
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columnsWithActions} 
                        data={data} 
                    />
                </CardContent>
            </Card>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng bị hủy
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={columnsWithActions1} 
                        data={rejectedOrders} 
                    />
                </CardContent>

                <DetailsModal 
                    order={selectedOrder}
                    open={isDetailsModalOpen}
                    onClose={() => setIsDetailsModalOpen(false)}
                />
            </Card>
        </SidebarInset>
    )
}