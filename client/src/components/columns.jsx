import { TableActionsDropdown } from "./table-actions-dropdown";

// this account columns is not finished
export const accountColumns = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "birthday",
        header: "Birthday"
    },
    {
        accessorKey: "password",
        header: "Password"
    },
]

export const variationColumns = ({ onViewDetails, onEdit, onDelete }) => [
    {
        accessorKey: "Product.product_name",
        header: "Tên sản phẩm"
    },
    {
        accessorKey: "Weight_Option.weight_name",
        header: "Cân nặng"
    },
    {
        accessorKey: "product_price",
        header: "Giá"
    },
    {
        accessorKey: "qty_in_stock",
        header: "Số Lượng"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const variation = row.original;

            return (
                <TableActionsDropdown 
                    onViewDetails={() => onViewDetails(variation.pw_id)}
                    onEdit={() => onEdit(variation.pw_id)}
                    onDelete={() => onDelete(variation.pw_id)}
                />
            )
        }
    }
]

// {
//     "product_id": "76aaf7d5-7701-42bd-9744-3938ec989be8",
//     "product_name": "Cà phê 1",
//     "description": "I'm coffee 1",
//     "image_url": "https://shop.phase-connect.com/cdn/shop/files/luminewcoffee_1776x1184.png?v=1715241054",
//     "Roast_Level": {
//         "roast_lvl": "Rang nhẹ"
//     },
//     "Product_Type": {
//         "type_name": "Hỗn hợp"
//     },
//     "Aroma": {
//         "aroma_name": "Hương trái cây"
//     }
// }

export const productColumns = ({ onViewDetails, onEdit, onDelete }) => [
    { accessorKey: "product_name", header: "Tên Sản Phẩm" },
    { accessorKey: "Roast_Level.roast_lvl", header: "Độ Rang" },
    { accessorKey: "Aroma.aroma_name", header: "Hương Vị" },
    { accessorKey: "Product_Type.type_name", header: "Loại Sản Phẩm" },
    {
        id: "actions",
        cell: ({ row }) => {
            // TO-DO: review code
            const product = row.original;

            return (
                <TableActionsDropdown 
                    onViewDetails={() => onViewDetails(product.product_id)}
                    onEdit={() => onEdit(product.product_id)}
                    onDelete={() => onDelete(product.product_id)}
                />
            )
        }
    }
]
