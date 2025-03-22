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
import { discountColumns } from '../columns.jsx'
import { AddModal } from '../modals/discounts/DiscountsModals.jsx'

import { useProductActions } from '@/hooks/table-actions/useProductActions.js'
import { getAllDiscounts } from '@/hooks/discountAPI.jsx'

function Discounts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllDiscounts(setData);
    }, [])

    const handleSubmitSuccess = () => {
        getAllDiscounts(setData);
    }

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
                                <BreadcrumbPage>Khuyến mãi</BreadcrumbPage>
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
                            <AddModal onSubmitSuccess={handleSubmitSuccess} />
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <DataTable 
                        columns={discountColumns} 
                        data={data} 
                    />

                    {/* <DetailsModal 
                        product={selectedProduct}
                        open={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                    />

                    <EditModal 
                        product={selectedProduct}
                        open={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSubmitSuccess={handleSubmitSuccess}
                    />

                    <DeleteModal
                        product={selectedProduct}
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                    />    */}

                </CardContent>
            </Card>
        </SidebarInset>
    )
}

export default Discounts