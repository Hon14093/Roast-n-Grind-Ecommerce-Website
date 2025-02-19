import { TableActionsDropdown } from "./table-actions-dropdown";

// replace this with actual function later
const viewDetails = () => {}
const editItem = () => {}
const deleteItem = () => {}

export const columns = [
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
            const product = row.orignal;

            return (
                <TableActionsDropdown 
                    onViewDetails={viewDetails}
                    onEdit={editItem}
                    onDelete={deleteItem}
                />
            )
        }
    }
]
