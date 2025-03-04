import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";

export function ProductDetailsBody() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    const hasVariations = product.variations.length > 0;
    const [selectedWeight, setSelectedWeight] = useState(hasVariations ? product.variations[0] : null);


    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found</p>;
    }

    return (
        <div className="text-darkOlive">
            <div className="bg-ivory">
                <div className="p-4 grid grid-cols-12">
                    <section className="col-span-6">
                        <img 
                            src={product.image_url} 
                            alt={product.product_name} 
                            className="w-full h-full object-cover rounded-md"
                        />
                    </section>
                    
                    <section className="col-span-6 md:px-[40px] max-w-[550px] mx-auto">
                        <h1 className="text-4xl font-serifs mt-4">{product.product_name}</h1>

                        <span className="text-4xl font-serifs mt-4">
                            {hasVariations ? 
                                `$${selectedWeight.price.toFixed(2)}` : 
                                <span className="text-red-500">Out of Stock</span>}
                        </span>

                        <p className="mt-2 text-darkOlive">{product.description}</p>

                        {hasVariations && (
                            <>
                                <h2 className="text-lg font-semibold mt-4">Chọn kích thước</h2>
                                <div className="mt-2 space-x-2">
                                    {product.variations.map((variation) => (
                                        <button
                                            key={variation.weight_id}
                                            onClick={() => setSelectedWeight(variation)}
                                            className={`px-4 py-2 border rounded-md 
                                                ${selectedWeight.weight_id === variation.weight_id
                                                    ? "bg-darkOlive text-ivory"
                                                    : "bg-second_bg_color text-darkOlive"
                                            }`}
                                        >
                                            {variation.weight_name}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        <button 
                            className={`w-full mt-5 big-action-button
                                ${hasVariations ? "text-ivory" : "bg-second_bg_color text-gray-700 cursor-not-allowed"}`}
                            onClick={() => hasVariations && console.log("Order button clicked for", product.product_id, "Weight:", selectedWeight?.weight_name)}
                            disabled={!hasVariations}
                        >
                            {hasVariations ? "Order Now" : "Out of Stock"}
                        </button>
                    </section>

                </div>

            </div>
        </div>
    )
}
