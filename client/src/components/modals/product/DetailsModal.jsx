import { 
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";

import React from 'react'

export function DetailsModal({ product, open, onClose }) {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    Details
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
