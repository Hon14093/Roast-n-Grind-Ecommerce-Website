import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Rating } from 'react-simple-star-rating';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { createReview } from '@/hooks/reviewAPI';

export default function ReviewForm({ detail, open, onClose }) {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState(null);

    const handleRating = (rate) => {
        setRating(rate);
        console.log(rate)
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            const data = {
                star: rating,
                comment: comment,
                product_id: detail.Product_Weight.Product.product_id,
                account_id: user.account_id
            }

            await createReview(data);
        } catch (error) {
            console.log(error)
        }
    }

    if (!detail) return null;
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đánh giá và nhận xét</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className='text-base text-darkOlive'>
                    <div className='pb-5'>
                        <Label className='font-bold'>Sản phẩm:  </Label>

                        {/* This is the problem */}
                        {detail?.Product_Weight?.Product?.product_name || "Loading..."}

                    </div>
                    <div className='mx-auto pb-5'>
                        <Rating
                            onClick={handleRating}
                            transition
                            showTooltip
                            allowHover={false}
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} 
                            tooltipArray={['Kinh khủng', 'Tệ', 'Trung bình', 'Tốt', 'Tuyệt vời']}
                        />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label className='text-lg font-semibold' htmlFor="feedback">Nhận xét:</Label>
                        <Textarea 
                            id='feedback'
                            onChange={(e) => setComment(e.target.value)} 
                            placeholder='Hãy để lại cảm nhận của bạn về sản phẩm'
                        />
                    </div>

                    <button type='submit' className='big-action-button text-ivory w-full mt-5'>
                        Đánh giá
                    </button>
                </form>
                
            </DialogContent>
        </Dialog>
    )
}
