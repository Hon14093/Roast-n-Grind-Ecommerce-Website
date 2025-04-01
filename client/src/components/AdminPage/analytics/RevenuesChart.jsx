import React, { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { getMonthlyRevenues } from '@/hooks/analyticsAPI'

const chartData = [
    { month: "January", revenue: 186 },
    { month: "February", revenue: 305 },
    { month: "March", revenue: 237 },
    { month: "April", revenue: 73 },
    { month: "May", revenue: 209 },
    { month: "June", revenue: 214 },
]
const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
}

export default function RevenuesChart() {
    const [revenues, setRevenues] = useState([]);

    useEffect(() => {
        getMonthlyRevenues(setRevenues);
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Thống kê doanh thu</CardTitle>
                <CardDescription>Dữ liệu từ 12 tháng trở lại</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className='max-h-[400px] w-full'>
                    <LineChart
                        accessibilityLayer
                        data={revenues}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />
                        <YAxis
                            tickFormatter={(value) => `${value / 1000000}tr`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                            formatter={(value) => `${value.toLocaleString()} VND`}
                        />
                        <Line
                            dataKey="revenue"
                            type="natural"
                            stroke="var(--color-revenue)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-revenue)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
