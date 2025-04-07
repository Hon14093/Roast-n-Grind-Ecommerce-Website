// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-darkOlive py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="text-white text-2xl font-bold">
                        Roast-n-Grind
                    </div>
                    <div className="space-x-4">
                        <Link to="/" className="text-white hover:text-gray-200">
                            Trang chủ
                        </Link>
                        <Link to="/shop" className="text-white hover:text-gray-200">
                            Cửa hàng
                        </Link>
                        <Link to="/about" className="text-white hover:text-gray-200">
                            Giới thiệu
                        </Link>
                        <Link to="/contact" className="text-white hover:text-gray-200">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;