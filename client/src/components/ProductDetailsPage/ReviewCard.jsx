import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

const ReviewCard = ({ review }) => {
    const { rating, comment, user, date } = review;
    
    return (
        <div className="p-4 my-3 shadow-md rounded-xl bg-ivory grid grid-cols-12">
            
                <picture className="col-span-1 mx-auto">
                    <img src="https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png" alt="" className="size-10" />
                </picture>

                <div className="col-span-11">
                    <div className="flex items-center mb-2 gap-3">
                        <div className="font-semibold text-lg">{user}</div>
                        <div>{date}</div>
                    </div>
                    <div className="flex gap-1 text-yellow-500">
                        {[...Array(5)].map((_, index) => (
                            <Star key={index} fill={index < rating ? "currentColor" : "none"} stroke="currentColor" />
                        ))}
                    </div>
                    <p className="text-gray-600 mt-2">{comment}</p>
                </div>
            
        </div>
    );
};

export default ReviewCard;
