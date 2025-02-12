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

import { DataTable } from '../data-table.jsx'
import { columns } from '../columns.jsx'

function Products() {
    // replace this with actual async getData() function
    const test_data = [
        {
            name: "Coffee bean #1",
            category: "Light roast",
            size: "250g",
            price: "$9.99"
        },
        {
            name: "Coffee bean #2",
            category: "Light roast",
            size: "500g",
            price: "$19.99"
        },
        {
            name: "Coffee bean #3",
            category: "Light roast",
            size: "1000g",
            price: "$38.99"
        },
        {
            name: "Coffee bean #4",
            category: "Light roast",
            size: "5000g",
            price: "$119.99"
        },
    ]

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
            
            {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div> */}

            <Card className="mx-5">
                <CardHeader>
                    Sản phẩm
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={test_data} />
                </CardContent>
            </Card>

        </SidebarInset>
    );
}

export default Products