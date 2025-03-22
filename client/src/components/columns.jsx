import { TableActionsDropdown } from "./table-actions-dropdown";
import { OrderTableActionsDropdown } from "./table-actions-dropdown";
import { Button } from "./ui/button";

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


// Newly formatted columns for better readability
// The columns arrays will not contains the functions anymore
// Instead, the functions will be added to columns in the component
// This will make the columns array more readable
// And less convoluted with multiple files for one table
export const orderColumns = [
    { accessorKey: "order_id", header: "ID Đơn Hàng" },
    { accessorKey: "order_date", header: "Ngày Đặt" },
    { accessorKey: "order_total", header: "Tổng Tiền" },
]

export const orderDetailsColumns = [
    { accessorKey: "Product_Weight.Product.product_name", header: "Tên Sản Phẩm" },
    { accessorKey: "Product_Weight.Weight_Option.weight_name", header: "Cân Nặng" },
    { accessorKey: "Product_Weight.product_price", header: "Giá" },
    { accessorKey: "quantity", header: "Số Lượng" },
    { accessorKey: "subtotal", header: "Thành Tiền" },
]

export const checkOrdersColumns = [
    { accessorKey: "order_id", header: "ID Đơn Hàng" },
    { accessorKey: "order_date", header: "Ngày Đặt" },
    { accessorKey: "order_total", header: "Tổng Tiền" },
    { accessorKey: "Account.account_name", header: "Tài Khoản" },
]

export const discountColumns = [
    { accessorKey: "discount_code", header: "Mã Khuyến Mãi" },
    { accessorKey: "discount_value", header: "Giá Trị Khuyến Mãi" },
    { accessorKey: "start_date", header: "Ngày Bắt Đầu" },
    { accessorKey: "end_date", header: "Ngày Kết Thúc" },
]