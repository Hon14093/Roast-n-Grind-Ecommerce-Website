import React, { useEffect, useState } from 'react'
import RatingSummary from '@keyvaluesystems/react-star-rating-summary'
import ReviewCard from './ReviewCard';
import { Separator } from '../ui/separator';
import { getReviewsByProductId } from '@/hooks/reviewAPI';

export default function ReviewSection({ productId }) {
    const [data, setData] = useState([]);
    const [ratingValues, setRatingValues] = useState({
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    });

    useEffect(() => {
        getReviewsByProductId(productId, setData, setRatingValues);
    }, [productId])
    
    return (
        <section className='p-4'>
            <span className='text-3xl font-bold text-darkOlive'>Đánh giá và nhận xét</span>

            <article className='max-w-[1250px] mx-auto'>
                <RatingSummary
                    ratingAverageIconProps={{
                        fillColor: '#780c17'
                    }}
                    ratings={ratingValues}
                    styles={{
                        AverageContainer: {
                            width: '700px',
                        },
                    }}
                    barColors={{
                        5: '#780c17',
                        4: '#780c17',
                        3: '#780c17',
                        2: '#780c17',
                        1: '#780c17'
                    }}
                />
            </article>

            <Separator className='bg-darkOlive my-4 mx-auto max-w-[80%]'/>

            <article id='reviewSection'>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có đánh giá.</p>
                )}
            </article>
        </section>
    )
}
