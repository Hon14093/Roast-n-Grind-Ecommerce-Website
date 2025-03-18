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
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>Placeholder 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Thông tin thống kê</p>
            </CardContent>
          </Card>
          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>Placeholder 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Thông tin thống kê</p>
            </CardContent>
          </Card>
          <Card className="aspect-video">
            <CardHeader>
              <CardTitle>Placeholder 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Thông tin thống kê</p>
            </CardContent>
          </Card>
        </div>
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