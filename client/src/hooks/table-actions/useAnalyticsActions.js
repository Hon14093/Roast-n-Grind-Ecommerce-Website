import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnalyticsData } from "../fetchAnalyticsData";

export function useAnalyticsActions() {
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [timeRange, setTimeRange] = useState("7d");
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (range = timeRange) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchAnalyticsData(range);
            setAnalyticsData(Array.isArray(data) ? data : []);
        } catch (error) {
            setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData(timeRange);
    }, [timeRange]);

    const handleFilterByTime = (range) => {
        setTimeRange(range);
    };

    const handleViewDetails = (metricId) => {
        const metric = analyticsData.find((item) => item.id === metricId);
        setSelectedMetric(metric);
        setIsDetailsModalOpen(true);
    };

    const handleReload = () => {
        fetchData();
    };

    const handleNavigate = () => {
        navigate("/AdminPage/Analytics");
    };

    return {
        analyticsData,
        selectedMetric,
        timeRange,
        isDetailsModalOpen,
        isLoading,
        error,
        fetchData,
        handleFilterByTime,
        handleViewDetails,
        handleReload,
        handleNavigate,
        setIsDetailsModalOpen,
    };
}