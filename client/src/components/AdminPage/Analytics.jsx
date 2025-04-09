import { AppSidebar } from "../app-sidebar.jsx";
import { Loader2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb.jsx";
import { Separator } from "../ui/separator.jsx";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { useEffect, useState } from "react";
import StatsCards from "./analytics/StatsCards.jsx";
import Popular from "./analytics/Popular.jsx";
import RevenuesChart from "./analytics/RevenuesChart.jsx";
import { getAllStats, getPopularProducts } from "@/hooks/analyticsAPI.jsx";

function Analytics() {
    const [data, setData] = useState({ revenue: 0, revenueLast30: 0 });
    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        getAllStats(setData);
        getPopularProducts(setPopularProducts);
    }, [])

    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">R&G</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Thống kê</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <StatsCards data={data} />

                <Popular products={popularProducts} />

                <RevenuesChart />

            </div>
        </SidebarInset>
    );
}

export default Analytics;