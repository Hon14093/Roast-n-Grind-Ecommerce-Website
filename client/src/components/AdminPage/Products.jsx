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
import { DetailsModal, EditModal } from '../modals/product/ProductModals.jsx'


function Products() {
    // replace this with actual async getData() function
    const test_data = [
        {
            product_id: '001',
            product_name: "Coffee bean #1",
            description: 'I am product 1',
            image_url: '...',
            roast_id: '1',
            type_id: '1',
            aroma: '1',
            roast_lvl: "Light roast",
            weight_name: "250g",
            price: "$9.99"
        },
        {
            product_id: '002',
            product_name: "Coffee bean #2",
            description: 'lkjlksjdf',
            image_url: '...',
            roast_id: '1',
            type_id: '1',
            aroma: '1',
            roast_lvl: "Light roast",
            weight_name: "250g",
            price: "$9.99"
        },
        {
            product_id: '003',
            product_name: "Coffee bean #3",
            description: 'lkjlksjdf',
            image_url: '...',
            roast_id: '1',
            type_id: '1',
            aroma: '1',
            roast_lvl: "Light roast",
            weight_name: "250g",
            price: "$9.99"
        },
        {
            product_id: '004',
            product_name: "Coffee bean #4",
            description: 'lkjlksjdf',
            image_url: '...',
            roast_id: '1',
            type_id: '1',
            aroma: '1',
            roast_lvl: "Light roast",
            weight_name: "250g",
            price: "$9.99"
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

                    <EditModal 
                        product={selectedProduct}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                    />

                </CardContent>
            </Card>

        </SidebarInset>
    );
}

export default Products