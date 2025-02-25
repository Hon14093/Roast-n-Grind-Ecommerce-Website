import { AppSidebar } from "../app-sidebar.jsx"
import {
    SidebarProvider,
} from "../ui/sidebar"

import { Routes, Route, Outlet } from "react-router-dom"
import Accounts from "./Accounts.jsx"
import Analytics from "./Analytics.jsx"
import Discounts from "./Discounts.jsx"
import Products from "./Products.jsx"
import Orders from "./Orders.jsx"
import Variations from "./Variations.jsx"

export default function Admin() {
    return (
        <SidebarProvider>
            {/* Sidebar Component on left side */}
            <AppSidebar />

            {/* Other content on right side with SPA application */}
            <Routes>
                <Route path="/" element={<Analytics />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/products" element={<Products />} />    
                <Route path="/products/variations" element={<Variations />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>

        </SidebarProvider>
    );
}
