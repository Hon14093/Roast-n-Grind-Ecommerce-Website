// pages/CheckoutPage.jsx
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cart from "@/components/layout/Cart";
import CheckoutBody from "@/components/CheckoutPage/CheckoutBody";

function CheckoutPage() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="text-darkOlive bg-ivory min-h-screen flex flex-col">
            <Cart isOpen={isOpen} toggleCart={toggleCart} />
            <Header darkBG={false} toggleCart={toggleCart} />

            <main className="px-10 relative pt-20 flex-1 min-h-[300px]">
                <CheckoutBody />
            </main>

            <Footer />
        </div>
    );
}

export default CheckoutPage;