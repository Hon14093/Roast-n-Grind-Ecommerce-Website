import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductDetailsBody() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card className="bg-second_bg_color">
                <CardContent className="p-4">
                    <img 
                        src={product.image_url} 
                        alt={product.product_name} 
                        className="w-full h-96 object-cover rounded-md"
                    />
                    <h1 className="text-2xl font-bold mt-4">{product.product_name}</h1>
                    <p className="mt-2 text-gray-600">{product.description}</p>

                    <h2 className="text-lg font-semibold mt-4">Available Weights & Prices</h2>
                    <ul className="mt-2 space-y-1">
                        {product.variations.length > 0 ? (
                            product.variations.map((variation) => (

                                // this needs fixing
                                <li key={variation.weight_id} className="flex justify-between">
                                    <span>{variation.weight_name}</span>
                                    <span className="font-bold">${variation.price.toFixed(2)}</span>
                                </li>

                            ))
                        ) : (
                            <p className="text-red-500">Out of Stock</p>
                        )}
                    </ul>
                </CardContent>
                <CardFooter className="p-4">
                    <button 
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={() => console.log("Order button clicked for", product.product_id)}
                    >
                        Order Now
                    </button>
                </CardFooter>
            </Card>
        </div>
    )
}
