import { getOrderDetailsData } from '@/hooks/orderAPI';
import React, { useEffect, useState } from 'react'
import { DataTable } from '@/components/data-table';
import { orderDetailsColumns } from '@/components/columns';

export default function ViewDetails({ order }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        getOrderDetailsData(order.order_id, setData);
    },[])

    return (
        <div>
            {/* <button onClick={() => console.log(data)}>
                Hello
            </button> */}

            <DataTable 
                columns={orderDetailsColumns}
                data={data}
            />

        </div>
    )
}
