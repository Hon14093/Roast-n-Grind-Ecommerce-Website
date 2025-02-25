import { TableActionsDropdown } from "./table-actions-dropdown";

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

export const variationColumns1 = [
    {
        accessorKey: "product_name",
        header: "Tên sản phẩm"
    },
    {
        accessorKey: "weight_name",
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
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const variation = row.original;

    //         return (
    //             <TableActionsDropdown 
    //                 onViewDetails={() => onViewDetails(variation.variation_id)}
    //                 onEdit={() => onEdit(variation.variation_id)}
    //                 onDelete={() => onDelete(variation.variation_id)}
    //             />
    //         )
    //     }
    // }
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

export const productColumns = ({ onViewDetails, onEdit, onDelete }) => [
    {
        accessorKey: "product_name",
        header: "Tên Sản Phẩm"
    },
    {
        accessorKey: "Roast_Level.roast_lvl",
        header: "Độ Rang"
    },
    {
        accessorKey: "Aroma.aroma_name",
        header: "Hương Vị"
    },
    {
        accessorKey: "Product_Type.type_name",
        header: "Loại Sản Phẩm"
    },
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
