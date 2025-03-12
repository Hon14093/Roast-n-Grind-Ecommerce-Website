// Lấy dữ liệu thống kê từ server
import { getAllOrders, getProductData } from "./productAPI";

export async function fetchAnalyticsData(range) {
    const now = new Date();
    let startDate;

    switch (range) {
        case "1d": startDate = new Date(now.setDate(now.getDate() - 1)); break;
        case "7d": startDate = new Date(now.setDate(now.getDate() - 7)); break;
        case "30d": startDate = new Date(now.setDate(now.getDate() - 30)); break;
        case "365d": startDate = new Date(now.setDate(now.getDate() - 365)); break;
        default: startDate = new Date(now.setDate(now.getDate() - 7));
    }

    try {
        // Lấy tất cả đơn hàng
        let orders = [];
        await getAllOrders((data) => {
            orders = data.filter(order => new Date(order.order_date) >= startDate);
        });

        // Tính tổng doanh thu
        const revenue = orders.reduce((sum, order) => sum + (order.order_total || 0), 0);

        // Tính số đơn hàng
        const orderCount = orders.length;

        // Tính sản phẩm bán chạy
        const productQuantities = {};
        orders.forEach(order => {
            order.Order_Details?.forEach(detail => {
                const pwId = detail.pw_id;
                productQuantities[pwId] = (productQuantities[pwId] || 0) + detail.quantity;
            });
        });

        let topProduct = { pw_id: null, quantity: 0 };
        for (const [pwId, qty] of Object.entries(productQuantities)) {
            if (qty > topProduct.quantity) {
                topProduct = { pw_id: pwId, quantity: qty };
            }
        }

        // Lấy thông tin sản phẩm
        let products = [];
        await getProductData((data) => {
            products = data;
        });

        const topProductDetails = products.find(p => 
            p.Product_Weight.some(pw => pw.pw_id === topProduct.pw_id)
        );

        // Chuẩn bị dữ liệu chi tiết cho modal
        const detailedOrders = orders.map(order => ({
            order_id: order.order_id,
            order_date: order.order_date,
            order_total: order.order_total,
            status_name: order.Order_Status?.status_name || "Không xác định",
        }));

        const ordersByDate = {};
        orders.forEach(order => {
            const date = new Date(order.order_date).toLocaleDateString();
            ordersByDate[date] = (ordersByDate[date] || 0) + 1;
        });

        return [
            {
                id: "revenue",
                name: "Tổng doanh thu",
                value: revenue,
                unit: "VND",
                details: detailedOrders, // Danh sách đơn hàng chi tiết
            },
            {
                id: "orders",
                name: "Số đơn hàng",
                value: orderCount,
                unit: "đơn",
                details: Object.entries(ordersByDate).map(([date, count]) => ({ date, count })), // Số đơn theo ngày
            },
            {
                id: "top_product",
                name: "Sản phẩm bán chạy",
                value: topProductDetails?.product_name || "Không xác định",
                unit: "",
                details: {
                    product_id: topProductDetails?.product_id,
                    quantity_sold: topProduct.quantity,
                    image_url: topProductDetails?.image_url,
                },
            },
        ];
    } catch (error) {
        console.error("Lỗi trong fetchAnalyticsData:", error);
        throw error; // Để hook xử lý lỗi
    }
}