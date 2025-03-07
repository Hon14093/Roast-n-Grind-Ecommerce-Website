// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function useAdminActions() {
//     const navigate = useNavigate();
//     const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
//     // Điều hướng đến các trang quản trị
//     const handleNavigate = (page) => {
//         const routes = {
//             discount: "/AdminPage/Discounts",
//             order: "/AdminPage/Orders",
//             account: "/AdminPage/Accounts",
//             analytics: "/AdminPage/Analytics",
//             product: "/AdminPage/Products",
//             variations: "/AdminPage/Variations",
//         };

//         if (routes[page]) {
//             navigate(routes[page]);
//         } else {
//             console.warn(`Không tìm thấy trang: ${page}`);
//         }
//     };

//     // Làm mới trang hiện tại
//     const handleReload = () => {
//         window.location.reload();
//     };

//     // Quản lý modal cài đặt
//     const handleSettings = () => {
//         setIsSettingsOpen(true);
//     };

//     return {
//         isSettingsOpen,
//         handleNavigate,
//         handleReload,
//         handleSettings,
//         setIsSettingsOpen,
//     };
// }
