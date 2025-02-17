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
import { accountColumns } from '../columns.jsx'

function Account() {
    const temp_data = [
        {
            id: '001',
            name: 'Calliope Mori',
            email: 'reaper@gmail.com',
            birthday: '11/1/1990',
            password: '11111'
        },
        {
            id: '001',
            name: 'Calliope Mori',
            email: 'reaper@gmail.com',
            birthday: '11/1/1990',
            password: '11111'
        },
        {
            id: '001',
            name: 'Calliope Mori',
            email: 'reaper@gmail.com',
            birthday: '11/1/1990',
            password: '11111'
        }
    ]
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
                                <BreadcrumbPage>Tài khoản</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            
            <Card>
                <CardHeader>
                    <div className='flex'>
                        <div className='font-bold text-2xl'>
                            Danh sách tài khoản
                        </div>
                        <Button variant='outline' className='ml-auto'>
                            <Plus />
                            Thêm sản phẩm
                        </Button>

                    </div>                    
                </CardHeader>

                <CardContent>
                    <DataTable columns={accountColumns} data={temp_data} />
                </CardContent>
            </Card>
        </SidebarInset>
    )
}

export default Account