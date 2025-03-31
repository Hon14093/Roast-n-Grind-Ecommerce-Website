import React, { useEffect, useState } from 'react'
import { Pie, PieChart } from 'recharts'
import { 
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios';

export default function StatusChart() {
    const [data, setData] = useState([]);
    const statusColors = [
        "var(--color-unprocessed)",
        "var(--color-processing)",
        "var(--color-packaging)",
        "var(--color-delivering)", 
        "var(--color-delivered)",
        "var(--color-cancelled)" 
    ];

    useEffect(() => {
        const getDistribution = async () => {
            try {
                const result = await axios('http://localhost:5000/api/analytics/status-distribution');
                console.log(result.data.distributions);
                setData(result.data.distributions)
            } catch (error) {
                console.log(error)
            }
        }

        getDistribution();
    }, []);

    const processedData = data.map((item, index) => ({
        ...item,
        fill: statusColors[index] || "var(--color-default)"
    }))

    const chartData = [
        { status: "Chưa xử lý", count: 275, fill: "var(--color-unprocessed)" },
        { status: "Đang xử lý", count: 200, fill: "var(--color-processing)" },
        { status: "Đang đóng gói", count: 187, fill: "var(--color-packaging)" },
        { status: "Đang giao hàng", count: 173, fill: "var(--color-delivering)" },
        { status: "Đã giao hàng", count: 90, fill: "var(--color-delivered)" },
        { status: "Đã hủy", count: 10, fill: "var(--color-cancelled)" },
    ]

    const chartConfig = {
        count: {
            label: "Hello",
        },
        unprocessed: {
            label: "Chưa xử lý",
            color: "hsl(var(--chart-1))",
        },
        processing: {
            label: "Đang xử lý",
            color: "hsl(var(--chart-2))",
        },
        packaging: {
            label: "Đang đóng gói",
            color: "hsl(var(--chart-3))",
        },
        delivering: {
            label: "Đang giao hàng",
            color: "hsl(var(--chart-4))",
        },
        delivered: {
            label: "Đã giao hàng",
            color: "hsl(var(--chart-5))",
        },
        cancelled: {
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
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
