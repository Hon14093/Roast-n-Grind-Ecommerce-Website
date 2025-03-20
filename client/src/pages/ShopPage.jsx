// pages/ShopPage.jsx
import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ShopBody from "@/components/ShopPage/ShopBody";
import Cart from "@/components/layout/Cart";

function ShopPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="text-darkOlive bg-ivory min-h-screen flex flex-col">
            {/* Cart slide-out */}
            <Cart isOpen={isOpen} toggleCart={toggleCart} />

            {/* Header */}
            <Header darkBG={false} toggleCart={toggleCart} />

            {/* Main content */}
            <main className="px-10 relative pt-20 flex-1">
                <ShopBody />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ShopPage;