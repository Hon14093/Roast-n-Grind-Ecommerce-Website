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
                    onViewDetails={() => onViewDetails(product.id)}
                    onEdit={() => onEdit(product.id)}
                    onDelete={() => onDelete(product.id)}
                />

                // <TableActionsDropdown 
                //     onViewDetails={viewDetails}
                //     onEdit={editItem}
                //     onDelete={deleteItem}
                // />
            )
        }
    }
]
