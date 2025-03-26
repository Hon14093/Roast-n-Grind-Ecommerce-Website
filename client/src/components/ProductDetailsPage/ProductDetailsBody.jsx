import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export function ProductDetailsBody() {
    const location = useLocation();
    const product = location.state?.product;
    const [grind, setGrind] = useState(false);
    const [qty, setQty] = useState(1);

    const { updateCart } = useCart();

    const hasVariations = product.variations.length > 0;
    const [selectedWeight, setSelectedWeight] = useState(hasVariations ? product.variations[0] : null);

    if (!product) {
        return <p className="text-center mt-10 text-red-500">Product not found</p>;
    }

    const handleAddToCart = () => {
        if (!selectedWeight) return;

        updateCart({
            product_id: product.product_id,
            pw_id: selectedWeight.pw_id,
            product_name: product.product_name,
            weight_id: selectedWeight.weight_id,
            weight_name: selectedWeight.weight_name,
            price: selectedWeight.price,
            image_url: product.image_url,
            grind: grind,
            quantity: qty,
        });
        // alert('Product added to cart!');
    };

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);

        if (isNaN(value)) {
            value = 1;
        }

        if (value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }

        setQty(value);
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
                                `${selectedWeight.price.toLocaleString()} vnđ` : 
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

                        <section className="flex mt-4 gap-5 items-center">
                            <h2 className="text-lg font-semibold ">Số lượng:</h2>
                            <Input 
                                type="number" 
                                className='max-w-20 border border-darkOlive' 
                                value={qty}
                                onChange={handleQuantityChange}
                                min="1" max="10"
                            />
                        </section>

                        <section className="flex mt-4 gap-4 items-center">
                            <h2 className="text-lg font-semibold ">Xay cà phê?</h2>
                            <Checkbox onClick={() => setGrind(true)} className='size-6'/>
                        </section>

                        <button 
                            className={`w-full mt-5 big-action-button
                                ${hasVariations ? "text-ivory" : "bg-second_bg_color text-gray-700 cursor-not-allowed"}`}
                            onClick={() => {
                                if (hasVariations) {
                                    handleAddToCart(); 
                                }
                            }}
                            disabled={!hasVariations}
                        >
                            {hasVariations ? "Thêm vào giỏ hàng" : "Out of Stock"}
                        </button>
                    </section>

                </div>

            </div>
        </div>
    )
}
