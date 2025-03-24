import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (data) => {
    return await prisma.order.create({ data });
}

export const getAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            Account: {
                include: {
                    password: false,
                    is_admin: false,
                    date_created: false
                }
            },
            Order_Status: true,
            Address: {
                include: {
                    City: true
                }
            },
            Discount: true,
            Shipping_Method: true
        }
    });

    return orders.map(order => ({
        ...order,
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getUnprocessedOrders = async () => {
    const result = await prisma.order.findMany({
        include: {
            Account: {
                select: { account_name: true }
            },
            Address: {
                include: {
                    City: true
                }
            },
            Order_Status: true,
            Shipping_Method: true,
            Discount: {
                select: { discount_code: true }
            }
        },
        where: {
            status_id: 1
        },
        orderBy: {
            order_date: 'desc',
        }
    })

    return result.map(res => ({
        ...res,
        order_date: res.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getRemainingOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            Account: {
                include: {
                    password: false,
                    is_admin: false,
                    date_created: false
                }
            },
            Order_Status: true,
            Address: {
                include: {
                    City: true
                }
            },
            Discount: true,
            Shipping_Method: true
        },
        where: {
            NOT: {
                status_id: 1
            }
        },
        orderBy: {
            order_date: 'asc',
        }
    })

    return orders.map(order => ({
        ...order,
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const getOrdersByAccountId = async (account_id) => {
    const orders = await prisma.order.findMany({
        include: {
            Account: {
                include: {
                    password: false,
                    is_admin: false,
                    date_created: false
                }
            },
            Order_Status: true,
            Address: {
                include: {
                    City: true
                }
            },
            Discount: true,
            Shipping_Method: true
        },
        where: {
            account_id: account_id
        },
        orderBy: {
            order_date: 'asc',
        }
    })

    return orders.map(order => ({
        ...order,
        order_date: order.order_date.toISOString().slice(0, 10) // Extract YYYY-MM-DD
    }));
}

export const updateOrderStatus = async (order_id, statusId) => {
    return await prisma.order.update({
        where: { order_id },
        data: {
            status_id: statusId
        }
    })
}




export const getOrderByID = async (order_id) => {
    return await prisma.order.findUnique({
        where: { order_id }
    });
}

export const deleteOrder = async (order_id) => {
    return await prisma.order.delete({
        where: { order_id }
    });
}

export const updateOrder = async (order_id, data) => {
    return await prisma.order.update({
        where: { order_id },
        data
    });
}

export const getOrderByUserID = async (user_id) => {
    return await prisma.order.findMany({
        where: { user_id }
    });
}

export const getOrderByStatus = async (status) => {
    return await prisma.order.findMany({
        where: { status }
    });
}

export const getOrderByDate = async (date) => {
    return await prisma.order.findMany({
        where: { date }
    });
}

export const getOrderByTotal = async (total) => {
    return await prisma.order.findMany({
        where: { total }
    });
}

export const getOrderByUserIDAndStatus = async (user_id, status) => {
    return await prisma.order.findMany({
        where: {
            user_id,
            status
        }
    });
}

