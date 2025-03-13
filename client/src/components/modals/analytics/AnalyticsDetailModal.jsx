// AnalyticsDetailModal.jsx
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AnalyticsDetailModal({ isOpen, onClose, metric }) {
    if (!isOpen || !metric) return null;

    const ordersChartData = metric.id === "orders" && metric.details ? {
        labels: metric.details.map(d => d.date),
        datasets: [{
            label: "Số đơn hàng theo ngày",
            data: metric.details.map(d => d.count),
            backgroundColor: "#FF6384",
            borderColor: "#FF6384",
            borderWidth: 1,
        }],
    } : null;

    const chartOptions = {
        responsive: true,
        plugins: { legend: { position: "top" }, title: { display: true, text: `Chi tiết ${metric.name}` } },
        scales: { y: { beginAtZero: true } },
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{metric.name}</h2>
                <p className="text-lg mb-4">
                    Giá trị: {metric.id === "revenue" ? `${metric.value.toLocaleString()} VND` : metric.value} {metric.unit || ""}
                </p>

                {/* Chi tiết cho Doanh thu */}
                {metric.id === "revenue" && metric.details && (
                    <div>
                        <h3 className="font-semibold mb-2">Danh sách đơn hàng</h3>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 border">Mã đơn</th>
                                    <th className="p-2 border">Ngày</th>
                                    <th className="p-2 border">Tổng tiền</th>
                                    <th className="p-2 border">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metric.details.map(order => (
                                    <tr key={order.order_id}>
                                        <td className="p-2 border">{order.order_id}</td>
                                        <td className="p-2 border">{new Date(order.order_date).toLocaleDateString()}</td>
                                        <td className="p-2 border">{order.order_total.toLocaleString()} VND</td>
                                        <td className="p-2 border">{order.status_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Chi tiết cho Số đơn hàng */}
                {metric.id === "orders" && metric.details && (
                    <div>
                        <Bar data={ordersChartData} options={chartOptions} />
                    </div>
                )}

                {/* Chi tiết cho Sản phẩm bán chạy */}
                {metric.id === "top_product" && metric.details && (
                    <div>
                        <h3 className="font-semibold mb-2">Thông tin sản phẩm</h3>
                        <div className="flex gap-4">
                            {metric.details.image_url && (
                                <img src={metric.details.image_url} alt={metric.value} className="w-24 h-24 object-cover rounded" />
                            )}
                            <div>
                                <p><strong>Tên:</strong> {metric.value}</p>
                                <p><strong>Số lượng bán:</strong> {metric.details.quantity_sold}</p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={onClose}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}
AnalyticsDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    metric: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        unit: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string,
            count: PropTypes.number,
            order_id: PropTypes.string,
            order_date: PropTypes.string,
            order_total: PropTypes.number,
            status_name: PropTypes.string,
            image_url: PropTypes.string,
            quantity_sold: PropTypes.number,
        })),
    }).isRequired,
};

export default AnalyticsDetailModal;
