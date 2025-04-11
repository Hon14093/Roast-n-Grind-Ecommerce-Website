import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createOrderDetails = async (data) => {
    console.log(data)
    return await prisma.order_Details.createMany({ 
        data,
        skipDuplicates: true
    });
};

export const getOrderDetailsByOrderId = async (orderId) => {
    return await prisma.order_Details.findMany({
        include: {
            Product_Weight: {
                include: {
                    Product: true,
                    Weight_Option: {
                        select: { weight_name: true }
                    }
                }
            }
        },
        where: { order_id: orderId }
    });
};

export const getSpecificOrderDetails = async (completedOrders) => {
    return await prisma.order_Details.findMany({
        where: {
            order_id: {
                in: completedOrders.map(o => o.order_id)
            }
        },
        include: {
            Product_Weight: {
                include: {
                    Product: {
                        include: {
                            Product_Weight: {
                                include: {
                                    Weight_Option: {
                                        select: { weight_name: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}




export const findOrderDetailById = async (id) => {
    return await prisma.order_Details.findUnique({
        where: { od_id: id } // Fixed field name
    });
};

export const getAllOrderDetails = async () => {
    return await prisma.order_Details.findMany();
};


export const getOrderDetailsByProductWeight = async (pwId) => {
    return await prisma.order_Details.findMany({
        where: { pw_id: pwId }
    });
};
