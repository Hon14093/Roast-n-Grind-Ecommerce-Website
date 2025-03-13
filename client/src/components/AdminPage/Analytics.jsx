import { useAnalyticsActions } from "@/hooks/table-actions/useAnalyticsActions";
import { AnalyticsDetailModal } from "@/components/modals/analytics/AnalyticsDetailModal";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
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
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../ui/sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analytics() {
    const {
        analyticsData,
        isLoading,
        error,
        handleFilterByTime,
        handleViewDetails,
        handleReload,
        isDetailsModalOpen,
        selectedMetric,
        setIsDetailsModalOpen,
        timeRange,
    } = useAnalyticsActions();

    const chartData = {
        labels: ["Doanh thu", "Số đơn hàng", "Sản phẩm bán chạy"],
        datasets: [
            {
                label: `Thống kê (${timeRange === "1d" ? "Ngày" : timeRange === "7d" ? "Tuần" : timeRange === "30d" ? "Tháng" : "Năm"})`,
                data: [
                    analyticsData.find(m => m.id === "revenue")?.value || 0,
                    analyticsData.find(m => m.id === "orders")?.value || 0,
                    analyticsData.find(m => m.id === "top_product")?.details?.quantity_sold || 0,
                ],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                borderColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { position: "top" }, title: { display: true, text: "Thống kê tổng quan" } },
        scales: { y: { beginAtZero: true } },
    };

    const exportToCSV = () => {
        const headers = ["Chỉ số", "Giá trị", "Đơn vị"];
        const rows = analyticsData.map(metric => [
            metric.name,
            metric.value,
            metric.unit || "",
            metric.details ? `Chi tiết: ${JSON.stringify(metric.details)}` : "",
        ]);
        const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `analytics_${timeRange}_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
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
                    <div className="flex flex-wrap gap-2 items-center">
                        <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => handleFilterByTime("1d")}>Ngày</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => handleFilterByTime("7d")}>Tuần</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => handleFilterByTime("30d")}>Tháng</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => handleFilterByTime("365d")}>Năm</button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={handleReload}>Làm mới</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={exportToCSV}>Xuất dữ liệu</button>
                    </div>

                    <div className="p-4 bg-white rounded-xl shadow-md">
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="ml-2">Đang tải dữ liệu...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600">Lỗi: {error}</div>
                    ) : analyticsData.length === 0 ? (
                        <div className="text-center text-gray-600">Không có dữ liệu trong khoảng thời gian này.</div>
                    ) : (
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            {analyticsData.map((metric) => (
                                <div key={metric.id} className="p-4 bg-white rounded-xl shadow-md flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold text-gray-700">{metric.name}</h3>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {metric.id === "revenue" ? `${metric.value.toLocaleString()} VND` : metric.value} {metric.unit || ""}
                                    </p>
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        onClick={() => handleViewDetails(metric.id)}
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <AnalyticsDetailModal
                        isOpen={isDetailsModalOpen}
                        onClose={() => setIsDetailsModalOpen(false)}
                        metric={selectedMetric}
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Analytics;