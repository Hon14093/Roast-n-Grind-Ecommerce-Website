// import { useState } from "react";

// export function useAccountActions(accounts) {
//     const [selectedAccount, setSelectedAccount] = useState(null);
//     const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

//     const handleViewDetails = (accountId) => {
//         const account = accounts.find((a) => a.account_id === accountId);
//         setSelectedAccount(account);
//         setIsDetailsModalOpen(true);
//     };

//     const handleEdit = (accountId) => {
//         const account = accounts.find((a) => a.account_id === accountId);
//         setSelectedAccount(account);
//         setIsEditModalOpen(true);
//     };

//     const handleDelete = async (accountId) => {
//         try {
//             const response = await fetch(`/api/accounts/${accountId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             if (response.ok) {
//                 console.log("Account deleted successfully");
//             } else {
//                 console.error("Failed to delete account");
//             }
//         } catch (error) {
//             console.error("Error deleting account:", error);
//         }
//     };

//     return {
//         selectedAccount,
//         isDetailsModalOpen,
//         isEditModalOpen,
//         isDeleteModalOpen,
//         handleViewDetails,
//         handleEdit,
//         handleDelete,
//         setIsDetailsModalOpen,
//         setIsEditModalOpen,
//         setIsDeleteModalOpen
//     };
// }
