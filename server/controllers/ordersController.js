const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                Order_Status: true,       // Lấy trạng thái đơn hàng
                Account: true,            // Lấy thông tin tài khoản
                Shipping_Method: true,    // Lấy phương thức vận chuyển
                Order_Details: {          // Lấy chi tiết đơn hàng
                    include: {
                        Product_Weight: true // Lấy thông tin sản phẩm trong đơn
                    }
                }
            }
        });

        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect(); // Đóng kết nối Prisma
    }
};