// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchAnalyticsData } from "@/hooks/analyticsAPI"; // API gọi dữ liệu phân tích

// export function useAnalyticsActions() {
//     const navigate = useNavigate();
//     const [analyticsData, setAnalyticsData] = useState([]);
//     const [selectedMetric, setSelectedMetric] = useState(null);
//     const [timeRange, setTimeRange] = useState("7d"); // Mặc định: 7 ngày
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     // Hàm lấy dữ liệu phân tích
//     const fetchData = async (range = timeRange) => {
//         setIsLoading(true);
//         try {
//             const data = await fetchAnalyticsData(range);
//             setAnalyticsData(data);
//         } catch (error) {
//             console.error("Lỗi khi tải dữ liệu phân tích:", error);
//         }
//         setIsLoading(false);
//     };

//     // Xử lý lọc dữ liệu theo thời gian (hôm nay, tuần, tháng, năm)
//     const handleFilterByTime = (range) => {
//         setTimeRange(range);
//         fetchData(range);
//     };

//     // Xử lý xem chi tiết một chỉ số cụ thể
//     const handleViewDetails = (metricId) => {
//         const metric = analyticsData.find((item) => item.id === metricId);
//         setSelectedMetric(metric);
//         setIsDetailsModalOpen(true);
//     };

//     // Làm mới dữ liệu phân tích
//     const handleReload = () => {
//         fetchData();
//     };

//     // Điều hướng đến trang phân tích chi tiết
//     const handleNavigate = () => {
//         navigate("/AdminPage/Analytics");
//     };

//     return {
//         analyticsData,
//         selectedMetric,
//         timeRange,
//         isDetailsModalOpen,
//         isLoading,
//         fetchData,
//         handleFilterByTime,
//         handleViewDetails,
//         handleReload,
//         handleNavigate,
//         setIsDetailsModalOpen,
//     };
// }
