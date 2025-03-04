import React, { useState } from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import WeightComboBox from '@/components/combobox/WeightCombobox';
import ProductCombobox from '@/components/combobox/ProductCombobox';
import { addProductVariation } from '@/hooks/productAPI';
import { Button } from '@/components/ui/button';

export function AddForm({ onSubmitSuccess }) {
    const [loading, setLoading] = useState(false);

    const [price, setPrice] = useState();
    const [qty, setQty] = useState();
    const [productID, setProductID] = useState('');
    const [weightValue, setWeightValue] = useState('');

    const handleSumit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const variation = {
                product_price: parseFloat(price),
                qty_in_stock: parseInt(qty),
                product_id: productID,
                weight_id: weightValue
            }

            const addVariationRes = await addProductVariation(variation);
            if (addVariationRes.data.success) {
                onSubmitSuccess();
            }
            console.log(addVariationRes);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="mx-auto gap-5 grid" onSubmit={handleSumit}>
            <ProductCombobox value={productID} onChange={setProductID} />
            <WeightComboBox value={weightValue} onChange={setWeightValue} />

            <article className="grid w-full items-center gap-1.5">
                <Label htmlFor="product_price">Giá</Label>
                <Input 
                    id="product_price" 
                    placeholder="Giá" 
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                />
            </article>

            <article className="grid w-full items-center gap-1.5">
                <Label htmlFor="qty_in_stock">Số lượng trong kho</Label>
                <Input 
                    id="qty_in_stock" 
                    placeholder="Số lượng trong kho" 
                    onChange={(e) => setQty(e.target.value)}
                    type="number"
                />
            </article>

            <Button type="Submit" disabled={loading}>
                {loading ? "Đang xử lý..." : "Thêm sản phẩm"}
            </Button>
        </form>
    )
}
