import Review from "../database/models/Reviews"
import { NewReview } from "../types"

export const addReview = async (review: NewReview) : Promise<Review> => {
    const newReview = await Review.create(review)
    return newReview
}

export const findReviews = async () : Promise<Review[]> => {
    const review = await Review.findAll({order: [['createdAt', 'DESC']]})
    return review
}

export const findReviewById = async (id: Review['id']) : Promise<Review | undefined> => {
    const review = await Review.findByPk(id)
    if(review) {
        return review
    }
    return undefined
}

export const findReviewsByTutorId = async (tutor_id: Review['tutor_id']) : Promise<Review[]> => {
    const reviews = await Review.findAll({
        where: {tutor_id},
        order: [['createdAt', 'DESC']]
    })
    return reviews
}