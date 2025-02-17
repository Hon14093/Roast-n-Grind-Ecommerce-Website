import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
// { onViewDetails, onEdit, onDelete}

const onViewDetails = () => { console.log("test") }
const onEdit = () => {}
const onDelete = () => {}

// this button will be used throughout all management table
export function TableActionsDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={onViewDetails}>
                    Xem chi tiết
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onEdit}>
                    Sửa
                </DropdownMenuItem>

                <DropdownMenuItem onClick={onDelete}>
                    Xóa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
