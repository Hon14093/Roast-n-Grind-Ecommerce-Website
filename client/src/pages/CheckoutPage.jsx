import React, { useState } from 'react'
import Footer from '@/components/layout/Footer'
import CheckoutBody from '@/components/CheckoutPage/CheckoutBody'
import Header from "@/components/layout/Header";

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Lỗi trong CheckoutPage:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="text-center p-4">
                    <h1 className="text-2xl font-bold text-red-500">Đã xảy ra lỗi</h1>
                    <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

function CheckoutPage() {
    const toggleCart = () => {}; // Thay bằng logic thực nếu dùng Cart

    return (
        <div className="text-darkOlive bg-ivory min-h-screen flex flex-col">
            {/* Bật lại Header nếu cần */}
            {/* <Header darkBG={false} toggleCart={toggleCart} /> */}

            <main className="flex-grow px-4 sm:px-10 py-6">
                <ErrorBoundary>
                    <CheckoutBody />
                </ErrorBoundary>
            </main>

            <Footer />
        </div>
    );
}

export default CheckoutPage;