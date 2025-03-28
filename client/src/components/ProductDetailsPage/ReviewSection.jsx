import React from 'react'
import RatingSummary from '@keyvaluesystems/react-star-rating-summary'
import ReviewCard from './ReviewCard';
import { Separator } from '../ui/separator';

export default function ReviewSection() {
    const ratingValues = {
        5: 226,
        4: 300,
        3: 191,
        2: 25,
        1: 50
    };

    const review = {
        rating: 4,
        comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo aperiam exercitationem, laboriosam possimus doloribus officia hic? Possimus, amet suscipit quas sunt reprehenderit architecto vitae hic autem facilis cum assumenda. Eaque vero nam eveniet, eos atque, error facere obcaecati voluptatibus harum quia officiis maxime sapiente aspernatur.',
        user: 'John Cat',
        date: '2020-12-4'
    }
    
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

            <article>
                <ReviewCard review={review}/>
                <ReviewCard review={review}/>
            </article>
        </section>
    )
}
