import React, { useEffect, useState } from 'react'
import { Pie, PieChart } from 'recharts'
import { 
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getDistribution } from '@/hooks/analyticsAPI'

export default function StatusChart() {
    const [data, setData] = useState([]);
    const statusColors = [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
        "#780c17"
    ];

    useEffect(() => {
        getDistribution(setData);
    }, []);

    const processedData = data.map((item, index) => ({
        ...item,
        fill: statusColors[index] || "var(--color-default)"
    }))

    const chartConfig = {
        count: {
            label: "count",
        },
        "Chưa xử lý": {
            label: "Chưa xử lý",
            color: "hsl(var(--chart-1))",
        },
        "Đang được xử lý": {
            label: "Đang xử lý",
            color: "hsl(var(--chart-2))",
        },
        "Đang đóng gói": {
            label: "Đang đóng gói",
            color: "hsl(var(--chart-3))",
        },
        "Đang giao hàng": {
            label: "Đang giao hàng",
            color: "hsl(var(--chart-4))",
        },
        "Đã giao hàng": {
            label: "Đã giao hàng",
            color: "hsl(var(--chart-5))",
        },
        "Đã hủy": {
            label: "Đã hủy",
            color: "#780c17",
        },
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Phân phối trạng thái đơn hàng</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie data={processedData} dataKey="count" label nameKey="status" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="status" />}
                            className="-translate-y-2 flex-wrap gap-4 [&>*]:justify-center text-darkOlive"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
