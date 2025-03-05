import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Cart({ isOpen, toggleCart }) {
    return (
        <div className="relative w-full overflow-hidden z-[99]">
            {/* Backdrop when card is open */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/20 transition-opacity duration-300" onClick={toggleCart} />
            )}

            {/* Slide out card */}
            <div
                className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <Card className="h-full rounded-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle>Slide Out Card</CardTitle>
                            <CardDescription>This card slides in from the right</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleCart} className="h-8 w-8">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <p className="mb-4 text-sm text-muted-foreground">
                        This is a slide-out card component that appears from the right side of the screen when triggered. It's
                        perfect for notifications, settings panels, or additional information.
                        </p>
                        <div className="grid gap-4">
                            <div className="rounded-md bg-muted p-4">
                                <p className="text-sm font-medium">Card Content Example</p>
                                <p className="text-xs text-muted-foreground">
                                You can place any content here, such as forms, lists, or details.
                                </p>
                            </div>
                            <div className="rounded-md bg-muted p-4">
                                <p className="text-sm font-medium">More Content</p>
                                <p className="text-xs text-muted-foreground">
                                The card takes up the full height of the viewport and can be scrolled if needed.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="mt-auto border-t pt-4">
                        <Button onClick={toggleCart} className="w-full">
                        Close
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}