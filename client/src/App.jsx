// App.jsx
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCallback from './components/PaymentCallback';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Toaster />
                <Router>
                    <Routes>
                        
                        {/* Customer UI */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:product_id" element={<ProductDetailsPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        {/* Admin UI */}
                        <Route path="/admin/*" element={<AdminPage />} />
                        {/* Payment Callback */}
                        <Route path="/payment/stripe-pay-callback" element={<PaymentCallback />} />

                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;