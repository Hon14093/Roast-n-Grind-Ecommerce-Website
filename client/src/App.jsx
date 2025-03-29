import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner'; // Thêm nguồn import

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentReturn from './components/modals/payment/PaymentReturn';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import PaymentSuccess from './components/modals/payment/PaymentSuccess';

function App() {
    return (
        <>
            <Toaster />
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <Routes>
                            {/* Customer UI */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route path="/product/:product_id" element={<ProductDetailsPage />} />
                            <Route path="/about" element={<AboutUsPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/account" element={<AccountPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            {/* Admin UI */}
                            <Route path="/admin/*" element={<AdminPage />} />
                            {/* Payment Return URL */}
                            <Route path="/payment/return" element={<PaymentReturn />} />
                            <Route path="/payment/success" element={<PaymentSuccess />} />
                        </Routes>
                    </Router>
                </CartProvider>
            </AuthProvider>
        </>
    );
}

export default App;