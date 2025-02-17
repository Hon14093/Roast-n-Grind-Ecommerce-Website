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
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "size",
        header: "Size"
    },
    {
        accessorKey: "price",
        header: "Price"
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
