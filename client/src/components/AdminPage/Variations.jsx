import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { Plus, PackagePlus } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { variationColumns } from '../columns.jsx'
import { DataTable } from '../data-table.jsx'
import { useVariationActions } from '@/hooks/table-actions/useVariationActions.js'
import { DetailsModal, EditModal, DeleteModal } from '../modals/variation/VariationModals.jsx'
import axios from 'axios'

export default function Variations() {

    const temp_data = [
        {
            pw_id: 1,
            Product: {
                product_name: 'Custom Roast Coffee Beans - Kaneko Lumi Inspired'
            },
            Weight_Option: {
                weight_name: '200g'
            },
            product_price: 100000,
            qty_in_stock: 100
        },
        {
            pw_id: 2,
            Product: {
                product_name: 'Custom Roast Coffee Beans - Kaneko Lumi Inspired'
            },
            Weight_Option: {
                weight_name: '500g'
            },
            product_price: 230000,
            qty_in_stock: 148
        },
        {
            pw_id: 3,
            Product: {
                product_name: 'Custom Roast Coffee Beans - Kaneko Lumi Inspired'
            },
            Weight_Option: {
                weight_name: '1000g'
            },
            product_price: 490000,
            qty_in_stock: 191
        },
    ]

    const {
        selectedVariation,
        isDetailsModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen
    } = useVariationActions(temp_data)

    return (
        <SidebarInset>
            {/* Don't really need to worry about the header */}
            {/* To start making changes, edit the elements in Card component */}
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
                                <BreadcrumbLink href="/admin/products">
                                    Sản phẩm
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator className="hidden md:block" />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Biến thể</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách biến thể sản phẩm
                        </div>

                        <div className='ml-auto'>
                            <Button variant='outline' >
                                <Plus />
                                Thêm biến thể
                            </Button>
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable
                        columns={variationColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        })} 
                        data={temp_data} 
                    />

                    <DetailsModal 
                        variation={selectedVariation}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    <EditModal 
                        variation={selectedVariation}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                    />

                    <DeleteModal
                        variation={selectedVariation}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />

                </CardContent>
            </Card>
        </SidebarInset>
        
    )
}
