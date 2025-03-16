import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrderDetail = async (data) => {
    return await prisma.order_Details.create({
        data: data
    });
};

// pay attention to which function you actually want to import
// one is plural and one is singular 
export const createOrderDetails = async (data) => {
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
