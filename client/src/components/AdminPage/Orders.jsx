
// import { useEffect } from 'react';
// import { useOrderActions } from '@/hooks/table-actions/useOrderActions';
// import { AddForm } from '@/components/modals/orders/AddForm';
// import { EditForm } from '@/components/modals/orders/EditForm';
// import { ViewDetails } from '@/components/modals/orders/ViewDetails';
// import React from 'react'

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
import { PackagePlus } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { orderColumns } from '../columns.jsx'
import { useProductActions } from '@/hooks/table-actions/useProductActions.js'
import { DetailsModal } from '../modals/order/OrderModals.jsx'

import { getOrderData } from '@/hooks/orderAPI.jsx'
import { Link } from 'react-router-dom'
import { useOrderActions } from '@/hooks/table-actions/useOrderActions.js'


function Orders() {
    const [data, setData] = useState([]);

    // function handleViewDetails() { console.log('details')}
    // function handleEdit() {}

    useEffect(() => {
        getOrderData(setData)
        
    }, []);

    const test = () => {
        console.log(data)
    }

    const {
        selectedOrder,
        isDetailsModalOpen,
        isEditModalOpen,
        handleViewDetails,
        handleEdit,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
    } = useOrderActions(data)

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
                                <BreadcrumbPage>Đơn hàng</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            
            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách đơn hàng
                        </div>

                        <div className='ml-auto'>
                                <Button variant='outline' className='mr-3' onClick={test}>
                                    <PackagePlus />
                                    Biến thể
                                </Button>

                            {/* <AddModal onSubmitSuccess={handleSubmitSuccess} /> */}
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    {/* <DataTable 
                        columns={productColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        })} 
                        data={data} 
                    /> */}

                    <DataTable 
                        columns={orderColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                        })} 
                        data={data} 
                    />

                    <DetailsModal 
                        order={selectedOrder}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    {/* <EditModal 
                        product={selectedProduct}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmitSuccess={handleSubmitSuccess}
                    /> */}


                </CardContent>
            </Card>
        </SidebarInset>
    );
}

export default Orders