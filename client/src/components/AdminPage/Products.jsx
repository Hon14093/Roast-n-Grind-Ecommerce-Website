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
import { PackagePlus } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { DataTable } from '../data-table.jsx'
import { productColumns } from '../columns.jsx'
import { useProductActions } from '@/hooks/table-actions/useProductActions.js'
import { DetailsModal, EditModal, DeleteModal, AddModal } from '../modals/product/ProductModals.jsx'

import { getProductData } from '@/hooks/productAPI.jsx'

function Products() {
    useEffect(() => {
        getProductData(setData)
    }, []);
    
    const [data, setData] = useState([]);
    const {
        selectedProduct,
        isDetailsModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        handleViewDetails,
        handleEdit,
        handleDelete,
        setIsDetailsModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen
    } = useProductActions(data);

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

                        <div className='ml-auto'>
                            <Link to='/admin/products/variations'>
                                <Button variant='outline' className='mr-3'>
                                    <PackagePlus />
                                    Biến thể
                                </Button>
                            </Link>

                            <AddModal />
                        </div>
                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={productColumns({
                            onViewDetails: handleViewDetails,
                            onEdit: handleEdit,
                            onDelete: handleDelete
                        })} 
                        data={data} 
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

                    <DeleteModal
                        product={selectedProduct}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />   

                </CardContent>
            </Card>
        </SidebarInset>
    );
}

export default Products