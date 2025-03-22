import React, { useEffect, useState } from 'react'
import { DataTable } from '../data-table';
import { getOrdersByAccountId, updateOrderStatus } from '@/hooks/orderAPI';
import { useAuth } from '../../context/AuthContext';
import { orderColumns } from '../columns';
import OrderStatusComboBox from '../combobox/OrderStatusCombobox';
import { Button } from '../ui/button';
import { DetailsModal } from '../modals/order/OrderModals';

function MyOrders() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        getOrdersByAccountId(user.account_id, setData);
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };

    const columnsWithActions = [
        ...orderColumns,
        { accessorKey: "Order_Status.status_name", header: "Trạng Thái" },
        {
            header: "Hành Động",
            id: "actions",
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <Button size="sm" className='bg-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500' 
                        onClick={() => handleViewDetails(row.original)}
                    >
                        Chi Tiết
                    </Button>
                    
                </div>
            )
        }
    ];

    return (
        <div>
            <DataTable data={data} columns={columnsWithActions} />

            <DetailsModal 
                order={selectedOrder}
                open={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
            />
        </div>
    )
}

export default MyOrders