import { 
    getTotalRevenue,
    getTotalRevenueLast30Days,
    countOrders,
    countUnprocessedOrders,
    countOrdersLast30Days,
    getOrderStatusDistribution,
    getMonthlyRevenues
} from "../models/Order.js"
import { getTotalAccounts } from "../models/Account.js"

export const getAllStats = async (req,res) => {
    try {
        const totalRevenue = await getTotalRevenue();
        const totalRevenueLast30Days = await getTotalRevenueLast30Days();
        const ordersCount = await countOrders();
        const unprocessedOrdersCount = await countUnprocessedOrders();
        const ordersCountLast30Days = await countOrdersLast30Days();
        const totalAccounts = await getTotalAccounts();

        const allStats = {
            revenue: totalRevenue._sum.order_total,
            revenueLast30: totalRevenueLast30Days._sum.order_total,
            orders: ordersCount,
            uncheckedOrders: unprocessedOrdersCount,
            ordersLast30: ordersCountLast30Days,
            totalAccounts: totalAccounts
        }

        res.status(200).json({ allStats })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const returnOrderStatusDistribution = async (req,res) => {
    try {
        const distributions = await getOrderStatusDistribution();
        res.status(200).json({ distributions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const returnMonthlyRevenue = async (req,res) => {
    try {
        const revenues = await getMonthlyRevenues();
        res.status(200).json({ revenues });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}