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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card.jsx";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart.jsx"; // Import từ chart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import StatsCards from "./analytics/StatsCards.jsx";
import Popular from "./analytics/Popular.jsx";
import axios from "axios";
import { ScrollArea } from "../ui/scroll-area.jsx";

// Dữ liệu mẫu
const chartData = [
    { month: "Tháng 1", revenue: 12000000 },
    { month: "Tháng 2", revenue: 19000000 },
    { month: "Tháng 3", revenue: 3000000 },
    { month: "Tháng 4", revenue: 5000000 },
];

// Config cho biểu đồ (dùng trong ChartContainer)
const chartConfig = {
    revenue: {
        label: "Doanh thu",
        color: "#4bc0c0", // Màu teal
    },
};

function Analytics() {
    const [data, setData] = useState({ revenue: 0, revenueLast30: 0 });
    const [popularProducts, setPopularProducts] = useState([]);
    // useState({ revenue: 0, orders: 0, customers: 0 });

    useEffect(() => {
        const getAllStats = async () => {
            try {
                const stats = await axios.get('http://localhost:5000/api/analytics/all');
                setData(stats.data.allStats);
                console.log('Stats', stats.data.allStats);
            } catch (error) {
                console.log(error);
            }
        }

        const getPopularProducts = async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/products/popular');
                setPopularProducts(result.data.sortedProducts);
                console.log(result.data.sortedProducts)
            } catch (error) {
                console.log(error);
            }
        }

        getPopularProducts();
        getAllStats();
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

                {/* <ScrollArea className='h-[500px]'>
                    
                    {cartItems.map((item) => (
                        <div
                            key={`${item.product_id}-${item.weight_id}`}
                            className="flex items-start gap-4 mb-4"
                        >
                            <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-28 h-28 object-cover rounded"
                            />

                            <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-base">Size: {item.weight_name}</p>
                                <span className="text-base w-[5rem]">Số lượng: {item.quantity}</span>
                                <p className="text-base">Xay: {item.grind ? "Có" : "Không"}</p>
                                <p className="text-base">Thành tiền: {item.price.toLocaleString()} vnđ</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea> */}

                <Card className="min-h-[400px] flex-1 md:min-h-min">
                    <CardHeader>
                        <CardTitle>Thống kê doanh thu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis
                                    tickFormatter={(value) => `${value / 1000000}M`}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                    formatter={(value) => `${value.toLocaleString()} VND`}
                                />
                                <Bar dataKey="revenue" fill="var(--color-revenue)" />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </SidebarInset>
    );
}

export default Analytics;