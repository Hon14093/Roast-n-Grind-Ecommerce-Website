import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// review_id, review_date,
// star, comment, product_id, account_id
export const createReview = async (data) => {
    return await prisma.review.create({ data });
}

export const getReviewsByProductId = async (product_id) => {
    return await prisma.review.findMany({
        include: {
            Account: true
        },
        where: { product_id }
    });
}





export const getAllReviews = async () => {
    return await prisma.review.findMany();
}

export const getReviewById = async (review_id) => {
    return await prisma.review.findUnique({
        where: { review_id }
    });
}

export const getReviewsByUserId = async (user_id) => {
    return await prisma.review.findMany({
        where: { user_id }
    });
}

export const deleteReview = async (review_id) => {
    return await prisma.review.delete({
        where: { review_id }
    });
}

export const updateReview = async (review_id, data) => {
    return await prisma.review.update({
        where: { review_id },
        data
    });
}

export const getReviewByUserIdAndProductId = async (user_id, product_id) => {
    return await prisma.review.findFirst({
        where: {
            user_id,
            product_id
        }
    });
}

export const getReviewByReviewId = async (review_id) => {
    return await prisma.review.findMany({
        where: { review_id }
    });
}

export const getReviewByRating = async (rating) => {
    return await prisma.review.findMany({
        where: { rating }
    });
}

export const getReviewByRatingAndProductId = async (rating, product_id) => {
    return await prisma.review.findMany({
        where: {
            rating,
            product_id
        }
    });
}

export const getReviewByRatingAndUserId = async (rating, user_id) => {
    return await prisma.review.findMany({
        where: {
            rating,
            user_id
        }
    });
}

export const getReviewByRatingAndUserIdAndProductId = async (rating, user_id, product_id) => {
    return await prisma.review.findMany({
        where: {
            rating,
            user_id,
            product_id
        }
    });
}

