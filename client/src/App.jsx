import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
    
    // This layout follows the Single Page Application (SPA) model
    // This App.jsx is the root component that contains all routes
    return (
        <>
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Routes>
                        {/* Customer UI */}
                        <Route path='/' element={<HomePage />} />
                        <Route path='/shop' element={<ShopPage />} />
                        <Route path='/product/:product_id' element={<ProductDetailsPage />} />
                        <Route path='/about' element={<AboutUsPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/account' element={<AccountPage />} />
                        <Route path='/checkout' element={<CheckoutPage />} />

                        {/* Admin UI */}
                        <Route path='/admin/*' element={<AdminPage />} />
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
        
        </>
    )
}

export default App
