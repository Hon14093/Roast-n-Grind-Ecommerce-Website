import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import StatusChart from './PieChart'

export default function Popular({ products, discount}) {
    return (
        <section className='grid grid-cols-2 gap-4'>
            <Card>
                <CardContent className='p-4 grid gap-4'>
                    <h1 className='font-semibold text-lg'>Các sản phẩm bán chạy</h1>
                    {products.map((item) => (
                        <div
                            key={`${item.product_id}-${item.weight_id}`}
                            className="flex items-start gap-4"
                        >
                            <img
                                src={item.image_url}
                                alt={item.product_name}
                                className="w-20 h-20 object-cover rounded"
                            />

                            <div>
                                <p className="font-medium">{item.product_name}</p>
                                <p className="font-medium">Đã bán: {item.total_sold}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <StatusChart />
        </section>
    )
}
