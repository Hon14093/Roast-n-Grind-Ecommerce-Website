import React from 'react'

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
import { Button } from '../ui/button.jsx'
import { Plus } from 'lucide-react'
import { DataTable } from '../data-table.jsx'
import { productColumns } from '../columns.jsx'
import { useProductActions } from '@/hooks/useProductActions.js'
import { DetailsModal } from '../modals/product/DetailsModal.jsx'
import { TableActionsDropdown } from '../table-actions-dropdown.jsx'


function Products() {
    // replace this with actual async getData() function
    const test_data = [
        {
            id: '001',
            name: "Coffee bean #1",
            category: "Light roast",
            size: "250g",
            price: "$9.99"
        },
        {
            id: '002',
            name: "Coffee bean #2",
            category: "Light roast",
            size: "500g",
            price: "$19.99"
        },
        {
            id: '003',
            name: "Coffee bean #3",
            category: "Light roast",
            size: "1000g",
            price: "$38.99"
        },
        {
            id: '004',
            name: "Coffee bean #4",
            category: "Light roast",
            size: "5000g",
            price: "$119.99"
        },
    ]

    const {
        selectedProduct,
        isDetailsModalOpen,
        isEditModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
    } = useProductActions(test_data);

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
                                <BreadcrumbPage>Sản phẩm</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Card className="mx-5">
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách sản phẩm
                        </div>
                        <Button variant='outline' className='ml-auto'>
                            <Plus />
                            Thêm sản phẩm
                        </Button>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={productColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        })} 
                        data={test_data} 
                    />

                    <DetailsModal 
                        product={selectedProduct}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                </CardContent>
            </Card>

        </SidebarInset>
    );
}

export default Products