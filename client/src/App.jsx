import './App.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutUsPage from './pages/AboutUsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import AdminPage from './pages/AdminPage';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     const checkAdmin = async () => {
    //         const user = await fetch()
    //     }
    // })
    
    return (
        <>
        
        <Router>
            <Routes>
                {/* Customer UI */}
                <Route path='/' element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/about' element={<AboutUsPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />

                {/* Admin UI */}
                <Route path='/admin/*' element={<AdminPage />} />
            </Routes>
        </Router>
        
        </>
    )
}

export default App
