import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";



const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    

    const minPrice = product.variations.length > 0 
        ? Math.min(...product.variations.map(v => v.price))
        : "N/A";

    

    return (
        <Card 
            className=" bg-second_bg_color cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/product/${product.product_id}`, { state: { product } })}
        >
            <CardContent className="p-4">
                <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full object-cover object-center rounded-b-md"
                    // className="w-full h-96 object-cover rounded-md"
                />
                <h2 className="text-lg font-medium mt-2">{product.product_name}</h2>
                <p className="mt-2 font-semibold">{minPrice !== "N/A" ? `vnđ ${minPrice}` : "Price unavailable"}</p>
            </CardContent>
        </Card>
        
    );
};

export default ProductCard;